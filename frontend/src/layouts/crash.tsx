import React from 'react'
import { Box, Button, Flex } from '@radix-ui/themes'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { UpdateIcon } from '@/components'
import { WindowReloadApp } from 'wailsjs/runtime'

export const Crash: React.FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="crashWrapper">
        <h3 className="crashTitle">⚠️ 出现异常</h3>
        <div className="crashMessage">
          <pre>Status: {error.status}</pre>
          <pre>Message: {error.statusText}</pre>
        </div>

        <CrashButton />
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div className="crashWrapper">
        <h3 className="crashTitle">⚠️ 出现致命错误</h3>
        <div className="crashMessage">
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </div>

        <CrashButton />
      </div>
    )
  } else {
    return (
      <div className="crashWrapper">
        <h3 className="crashTitle">⚠️ 出现未知错误</h3>

        <CrashButton />
      </div>
    )
  }
}

const CrashButton: React.FC = () => {
  return (
    <Flex gap="5">
      <Box>
        <Button
          variant="soft"
          onClick={() => {
            WindowReloadApp()
          }}
        >
          <UpdateIcon />
          Reload APP
        </Button>
      </Box>
    </Flex>
  )
}
