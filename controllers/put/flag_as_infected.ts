import { Request, Response } from 'express'
import survivors, { infected } from '../../data_store'
import { Survivor } from '../../interfaces/survivor'
import { Infected } from '../../interfaces/infected'

const flagAsInfected = (req: Request, res: Response) => {
  const { your_name, infected_name } = req.body

  const checkIfReporterExists = survivors.findIndex(
    (obj) => obj.name === your_name
  )
  if (checkIfReporterExists === -1) {
    res.status(401).json({
      msg: `${your_name} does not exists`,
    })
    return
  }

  const infectedSurvivorIndex = infected.findIndex((obj: Infected) => {
    return obj.name === infected_name
  })
  if (infectedSurvivorIndex === -1) {
    infected.push({
      name: infected_name,
      confirmedByCount: 1,
      confirmedByNames: [your_name],
    })
    res.status(200).json({
      msg: `Survivor ${infected_name} marked as infected!`,
    })
    return
  }

  const ifAlreadyFlagged = infected[
    infectedSurvivorIndex
  ].confirmedByNames.findIndex((name: string) => name === your_name)

  if (ifAlreadyFlagged !== -1) {
    res.status(403).json({
      msg: `You have already flagged this survivor`,
    })
    return
  }
  infected[infectedSurvivorIndex].confirmedByCount += 1
  infected[infectedSurvivorIndex].confirmedByNames = [
    ...infected[infectedSurvivorIndex].confirmedByNames,
    your_name,
  ]

  if (infected[infectedSurvivorIndex].confirmedByCount >= 3) {
    const survivorIndex = survivors.findIndex((obj: Survivor) => {
      return obj.name === infected_name
    })
    survivors[survivorIndex].infected = true
  }

  res.status(200).json({
    msg: `Survivor ${infected_name} marked as infected!`,
  })
}

export default flagAsInfected
