import { Router } from "express"
import { controllers } from "Interface-back"

const router = Router()
const controller = controllers.songs

router.get("/:id", controller.get)

export default router
