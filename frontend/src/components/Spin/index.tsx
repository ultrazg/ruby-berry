import React from 'react'
import { Spinner } from '@radix-ui/themes'

type IProps = {
  size?: '1' | '2' | '3'
}

export const Spin: React.FC<IProps> = ({ size }) => {
  return <Spinner size={size} />
}
