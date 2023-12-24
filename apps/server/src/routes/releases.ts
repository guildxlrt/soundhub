import { Router } from "express"
import { releasesController } from "Controllers"

const router = Router()

router.get("/", releasesController.getAll)

router.post("/new", releasesController.create)

router.get("/:id", releasesController.get)

router.put("/edit", releasesController.modify)

router.get("/by-artist/:id/", releasesController.getManyByArtist)

router.get("/by-genre/:genre/", releasesController.getManyByGenre)

export default router
