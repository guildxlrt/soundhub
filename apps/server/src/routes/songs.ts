import { Router } from "express"
import { controllers } from "Controllers"

const router = Router()
const controller = controllers.songs

router.get("/:id", controller.get)

export default router
