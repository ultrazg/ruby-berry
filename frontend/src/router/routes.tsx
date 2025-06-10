import { createHashRouter } from 'react-router-dom'
import { Launcher, PendingTask, FinishedTask } from '@/views'
import { Root } from '@/layouts/root'

export const router = createHashRouter([
  // {
  //   path: '/',
  //   element: <Launcher />,
  // },
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: 'pending',
        element: <PendingTask />,
      },
      {
        path: 'finished',
        element: <FinishedTask />,
      },
    ],
  },
])
