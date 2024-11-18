import React, { memo } from 'react'
import type { ItemLayout } from './type'
import Layout from './Layout'

interface Props extends ItemLayout {
  children: React.ReactNode
}

const FormItem = ({ children, ...rest }: Props) => {
  const { ...layoutProps } = rest
  return <Layout {...layoutProps}>{children}</Layout>
}

export default memo(FormItem)
