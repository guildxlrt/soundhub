import { Router } from "express"
import { controller } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.songs
const endpts = apiPathEnd.songs

router.get(endpts.get, ctrl.get)
router.post(endpts.add, ctrl.add)
router.get(endpts.edit, ctrl.edit)
router.get(endpts.delete, ctrl.delete)

export default router
