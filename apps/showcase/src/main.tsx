import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ShowcaseApp } from './ShowcaseApp'
import './tailwind-theme.local.css'
import '@zui/react/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShowcaseApp />
  </StrictMode>,
)
