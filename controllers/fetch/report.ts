import { Request, Response } from 'express'
import survivors, { itemPoints } from '../../data_store'

const report = (req: Request, res: Response) => {
  let healthy = 0
  let infected = 0
  let lostPoints = 0
  let percentageHealthy: number,
    percentageInfected: number = 0
  const resources = {
    water: 0,
    food: 0,
    ammunition: 0,
    medication: 0,
  }
  survivors.forEach((survivor) => {
    if (survivor.infected) infected++
    else healthy++
    survivor.inventory.forEach((obj) => {
      resources[obj.item] += obj.quantity
      if (survivor.infected) {
        lostPoints += itemPoints[obj.item]
      }
    })
  })
  percentageHealthy = (healthy / survivors.length) * 100
  percentageInfected = (infected / survivors.length) * 100
  let averageResources = {
    water: Math.floor(resources.water / survivors.length),
    food: Math.floor(resources.food / survivors.length),
    ammunition: Math.floor(resources.ammunition / survivors.length),
    medication: Math.floor(resources.medication / survivors.length),
  }
  res.status(200).json({
    healthy: percentageHealthy,
    infected: percentageInfected,
    lostPoints,
    averageResources,
  })
}

export default report
