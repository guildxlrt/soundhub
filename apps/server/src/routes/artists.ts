import { Router } from "express"
import { controller } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.artists
const endpts = apiPathEnd.artist

router.get(endpts.getByID, ctrl.getByID)
router.get(endpts.getByEmail, ctrl.getByEmail)

export default router
