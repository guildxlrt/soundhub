import { Router } from "express"
import { controllers } from "Interface-back"
import { apiEndpts } from "Shared"

const router = Router()
const controller = controllers.songs

router.get(apiEndpts.songs.oneById, controller.get)

export default router
