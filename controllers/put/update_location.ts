import { Request, Response } from 'express'
import survivors from '../../data_store'
import { Survivor } from '../../interfaces/survivor'

const updateLocation = (req: Request, res: Response) => {
  const { name, location } = req.body
  const survivorIndex = survivors.findIndex((obj: Survivor) => {
    return obj.name === name
  })
  if (survivorIndex === -1) {
    res.status(404).json({
      msg: 'Survivor with this name does not exist',
    })
    return
  }
  survivors[survivorIndex].lastLocation = location
  res.status(200).json({
    msg: 'Successfully updated survivor location',
    survivor: survivors[survivorIndex],
  })
}

export default updateLocation
