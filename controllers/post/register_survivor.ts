import { Request, Response } from 'express'
import survivors from '../../data_store'
import { Survivor } from '../../interfaces/survivor'

const registerSurvivor = (req: Request, res: Response) => {
  const survivor: Survivor = req.body
  const foundSurvivor = survivors.find((obj: Survivor) => {
    return obj.name === survivor.name
  })
  if (foundSurvivor) {
    res.status(406).json({
      msg: 'Survivor with this name already exists',
    })
    return
  }
  survivors.push({ ...survivor, infected: false })
  res.status(200).json({
    msg: `Survivor ${survivor.name} registered`,
  })
}

export default registerSurvivor
