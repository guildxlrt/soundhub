import { Router } from "express"
import { controller } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.songs
const endpts = apiUrlEndpt.songs

router.get(endpts.oneByID, ctrl.get)

export default router
