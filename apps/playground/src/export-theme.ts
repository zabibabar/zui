interface ExportThemeBundleInput {
  themeCss: string
  tailwindThemeCss: string
}

function buildReadme() {
  return `# ZUI Theme Export

This bundle contains files exported from the ZUI Playground.

## Files

- \`theme.css\`: your generated semantic theme tokens for both \`[data-theme="light"]\` and \`[data-theme="dark"]\`, plus playground typography overrides.
- \`tailwind-theme.css\`: Tailwind v4 bridge that maps semantic CSS variables to Tailwind theme tokens/utilities.

## How to use

1. Add both files to your app styles.
2. Ensure your app root has a \`data-theme\` attribute (\`light\` or \`dark\`).
3. Import \`tailwind-theme.css\` before using theme-based Tailwind utilities.
4. Import or self-host any non-system fonts selected in the playground before applying the theme.

If you use \`@zui/react\` components with Tailwind v4, add app-local \`@source\`
entries so Tailwind scans component class usage:

\`\`\`css
@import "./tailwind-theme.css";
@source "../node_modules/@zui/react/src";
\`\`\`

In a monorepo, point \`@source\` to your local React package source path instead.
Keep these \`@source\` entries in your app (not in the shared \`tailwind-theme.css\`).

Example:

\`\`\`css
@import "./tailwind-theme.css";
@import "./theme.css";
\`\`\`

\`\`\`html
<html data-theme="light">
  ...
</html>
\`\`\`

To toggle dark mode at runtime:

\`\`\`ts
document.documentElement.setAttribute("data-theme", "dark")
// or "light"
\`\`\`
`
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

interface ZipFile {
  name: string
  bytes: Uint8Array
  crc32: number
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[i] = c >>> 0
  }
  return table
})()

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function writeUint16(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value & 0xffff, true)
}

function writeUint32(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value >>> 0, true)
}

function dosTime(now: Date): number {
  return (
    ((now.getHours() & 0x1f) << 11) |
    ((now.getMinutes() & 0x3f) << 5) |
    (Math.floor(now.getSeconds() / 2) & 0x1f)
  )
}

function dosDate(now: Date): number {
  return (
    (((now.getFullYear() - 1980) & 0x7f) << 9) |
    (((now.getMonth() + 1) & 0x0f) << 5) |
    (now.getDate() & 0x1f)
  )
}

function buildZip(files: ZipFile[]): Uint8Array {
  const now = new Date()
  const time = dosTime(now)
  const date = dosDate(now)
  const encoder = new TextEncoder()

  const localParts: Uint8Array[] = []
  const centralParts: Uint8Array[] = []
  let localSize = 0
  let centralSize = 0

  for (const file of files) {
    const filename = encoder.encode(file.name)
    const localHeader = new Uint8Array(30)
    const localView = new DataView(localHeader.buffer)
    writeUint32(localView, 0, 0x04034b50)
    writeUint16(localView, 4, 20)
    writeUint16(localView, 6, 0)
    writeUint16(localView, 8, 0)
    writeUint16(localView, 10, time)
    writeUint16(localView, 12, date)
    writeUint32(localView, 14, file.crc32)
    writeUint32(localView, 18, file.bytes.length)
    writeUint32(localView, 22, file.bytes.length)
    writeUint16(localView, 26, filename.length)
    writeUint16(localView, 28, 0)

    localParts.push(localHeader, filename, file.bytes)

    const centralHeader = new Uint8Array(46)
    const centralView = new DataView(centralHeader.buffer)
    writeUint32(centralView, 0, 0x02014b50)
    writeUint16(centralView, 4, 20)
    writeUint16(centralView, 6, 20)
    writeUint16(centralView, 8, 0)
    writeUint16(centralView, 10, 0)
    writeUint16(centralView, 12, time)
    writeUint16(centralView, 14, date)
    writeUint32(centralView, 16, file.crc32)
    writeUint32(centralView, 20, file.bytes.length)
    writeUint32(centralView, 24, file.bytes.length)
    writeUint16(centralView, 28, filename.length)
    writeUint16(centralView, 30, 0)
    writeUint16(centralView, 32, 0)
    writeUint16(centralView, 34, 0)
    writeUint16(centralView, 36, 0)
    writeUint32(centralView, 38, 0)
    writeUint32(centralView, 42, localSize)

    centralParts.push(centralHeader, filename)

    localSize += localHeader.length + filename.length + file.bytes.length
    centralSize += centralHeader.length + filename.length
  }

  const end = new Uint8Array(22)
  const endView = new DataView(end.buffer)
  writeUint32(endView, 0, 0x06054b50)
  writeUint16(endView, 4, 0)
  writeUint16(endView, 6, 0)
  writeUint16(endView, 8, files.length)
  writeUint16(endView, 10, files.length)
  writeUint32(endView, 12, centralSize)
  writeUint32(endView, 16, localSize)
  writeUint16(endView, 20, 0)

  const total = localSize + centralSize + end.length
  const out = new Uint8Array(total)
  let offset = 0
  for (const part of [...localParts, ...centralParts, end]) {
    out.set(part, offset)
    offset += part.length
  }
  return out
}

export function exportThemeBundle({ themeCss, tailwindThemeCss }: ExportThemeBundleInput): void {
  const encoder = new TextEncoder()
  const files: ZipFile[] = [
    {
      name: 'theme.css',
      bytes: encoder.encode(themeCss),
      crc32: 0,
    },
    {
      name: 'tailwind-theme.css',
      bytes: encoder.encode(tailwindThemeCss),
      crc32: 0,
    },
    {
      name: 'README.md',
      bytes: encoder.encode(buildReadme()),
      crc32: 0,
    },
  ]
  for (const file of files) file.crc32 = crc32(file.bytes)

  const archive = buildZip(files)
  const blob = new Blob([archive.buffer as ArrayBuffer], { type: 'application/zip' })
  downloadBlob('zui-theme-export.zip', blob)
}
