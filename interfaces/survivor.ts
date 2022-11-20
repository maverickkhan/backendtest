import { Item } from '../data_store'

export interface Survivor {
  name: string
  age: number
  gender: string
  lastLocation: Array<number>
  inventory: Array<Inventory>
  infected?: boolean
}

export interface Inventory {
  item: Item
  quantity: number
}
