import { Router } from "express"
import { controllers } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = controllers.songs
const endpts = apiUrlEndpt.songs

router.get(endpts.oneByID, controller.get)

export default router
