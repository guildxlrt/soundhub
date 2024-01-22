import { Router } from "express"
import { Controller } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = Controller.songs()
const endpts = apiUrlEndpt.songs

router.get(endpts.oneByID, controller.get)

export default router
