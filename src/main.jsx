import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/index.css'
import { AppTodo } from './AppTodo'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTodo />
  </StrictMode>,
)
