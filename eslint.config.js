import antfu from '@antfu/eslint-config'
import prettier from 'eslint-config-prettier'

export default antfu(
  {
    typescript: true,
    react: false,
    jsonc: false,
    yaml: false,
    toml: false,
    markdown: false,
  },
  prettier,
)
