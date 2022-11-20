import { Router } from 'express'
import registerSurvivor from '../controllers/post/register_survivor'
import updateLocation from '../controllers/put/update_location'
import flagAsInfected from '../controllers/put/flag_as_infected'
import allSurvivors from '../controllers/fetch/all_survivors'
import tradeItems from '../controllers/post/trade_items'
import report from '../controllers/fetch/report';
const router = Router()

router.get(`/survivors`, allSurvivors)
router.get(`/report`, report)
router.post(`/register`, registerSurvivor)
router.post(`/trade`, tradeItems)
router.put(`/location`, updateLocation)
router.put(`/flag`, flagAsInfected)

export default router
