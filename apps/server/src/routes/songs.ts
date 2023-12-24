import { Router } from "express"
import { songsController } from "Controllers"

const router = Router()

router.get("/:id", songsController.get)

router.get("/by-artist/:id/", songsController.getManyByArtist)

router.get("/by-release/:id/", songsController.getManyByGenre)

export default router
