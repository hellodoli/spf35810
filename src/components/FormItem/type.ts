export interface ItemLayout {
  label?: string
  labelWidth?: string
  isWrapLabel?: boolean

  contentWidth?: string
  contentColor?: string
  contentClassName?: string

  subLabel?: string
  subLabelWidth?: number | string

  pb?: number | string
  pl?: number | string
  mt?: number | string
  center?: boolean

  className?: string
}
