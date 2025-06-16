import { createHashRouter } from 'react-router-dom'
import { Launcher, PendingTask, FinishedTask, About, Setting } from '@/views'
import { Root } from '@/layouts/root'
import { Crash } from '@/layouts/crash'

export const router = createHashRouter([
  {
    path: '/launcher',
    element: <Launcher />,
  },
  {
    path: '/',
    Component: Root,
    errorElement: <Crash />,
    children: [
      {
        index: true,
        element: <PendingTask />,
      },
      {
        path: 'finished',
        element: <FinishedTask />,
      },
      {
        path: 'setting',
        element: <Setting />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])
