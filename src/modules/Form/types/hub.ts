import { HUB_TYPE } from 'modules/Form/types/enum'
import { JoinOrder } from 'modules/Form/types/join'

export interface HubShift {
  id: string
  start: string
  end: string
  hub: HUB_TYPE
  duration: number
  minHub: number
  maxHub: number
}

export type HubShiftRawArr = {
  [key in HUB_TYPE]: [string, string][]
}

export type HubShiftList = {
  [key in HUB_TYPE]: HubShift[]
}

export type ExtraOrderList = {
  [key in HUB_TYPE]: [number, number | null, number][]
}

export interface HubGenaral {
  hubType: HUB_TYPE
  hubShift: string
  hubTime: number
  order: number
  joins: JoinOrder[]
  isHubWellDone?: boolean
}

export interface Hub extends HubGenaral {
  id: string // unique id
}

export type MyHubs = {
  [hubTime: string]: {
    [hubId: string]: Hub
  }
}

export interface RangeTime {
  start: number
  end: number
}

export type HubColorsFilter = {
  [key in HUB_TYPE]: string
}
