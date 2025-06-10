import { createHashRouter } from 'react-router-dom'
import { Launcher } from '@/views'

export const router = createHashRouter([
  {
    path: '/',
    element: <Launcher />
  }
])
