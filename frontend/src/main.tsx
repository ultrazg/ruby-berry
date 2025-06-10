import React from 'react'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import '@radix-ui/themes/tokens/base.css'
import '@radix-ui/themes/tokens/colors/ruby.css'
import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <Theme
      hasBackground={false}
      radius="medium"
      appearance="light"
      accentColor="ruby"
    >
      <App />
    </Theme>
  </React.StrictMode>
)
