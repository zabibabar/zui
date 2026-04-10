export interface ScrollAreaTokens {
  readonly scrollbar: {
    readonly padding: number
    readonly width: number
  }
}

export const defaultScrollAreaTokens: ScrollAreaTokens = {
  scrollbar: { padding: 0.5, width: 2.5 },
}
