import { Router } from "express"
import { controller } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.songs
const endpts = apiUrlEndpt.songs

router.get(endpts.get, ctrl.get)
router.get(endpts.find, ctrl.findMany)

export default router
