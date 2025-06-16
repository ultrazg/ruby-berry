import React from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { modalType } from '@/types'

/**
 * @description 模态框
 * @param title 标题
 * @param open 是否打开
 * @param onClose 关闭回调
 * @param children 子元素
 * @param width 宽度
 * @param options 附加操作
 * @constructor
 */
export const Modal: React.FC<modalType> = ({
  title,
  open,
  onClose,
  children,
  width,
  options,
}) => {
  // https://github.com/radix-ui/primitives/discussions/1997
  const avoidDefaultDomBehavior = (e: Event) => {
    e.preventDefault()
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onClose}
    >
      <Dialog.Content
        onPointerDownOutside={avoidDefaultDomBehavior}
        onInteractOutside={avoidDefaultDomBehavior}
        maxWidth={width}
        style={{
          fontSize: 14,
        }}
      >
        <Dialog.Title
          style={{
            userSelect: 'none',
            cursor: 'default',
            fontSize: 16,
          }}
        >
          {title}
        </Dialog.Title>

        {children}

        <Flex
          gap="3"
          mt="4"
          justify="end"
        >
          {options}

          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
            >
              关闭
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
