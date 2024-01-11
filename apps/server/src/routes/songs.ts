import { Router } from "express"
import { controllers } from "Interface-back"
import { apiEndpts } from "libs/infra-frontend/src/assets"

const router = Router()
const controller = controllers.songs

router.get(apiEndpts.songs.oneById, controller.get)

export default router
