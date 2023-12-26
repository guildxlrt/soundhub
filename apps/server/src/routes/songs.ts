import { Router } from "express"
import { songsController } from "Controllers"

const router = Router()

router.get("/:id", songsController.get)

export default router
