import { Survivor } from './interfaces/survivor'
import { Infected } from './interfaces/infected'

const survivors: Array<Survivor> = []
const infected: Array<Infected> = []

const itemPoints = {
  ammunition: 1,
  medication: 2,
  food: 3,
  water: 4,
}

type Item = 'water' | 'food' | 'medication' | 'ammunition'

export default survivors
export { infected, itemPoints, Item }
