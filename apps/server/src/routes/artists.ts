import { Router } from "express"
import { artistsController } from "Controllers"

const router = Router()

router.get("/", artistsController.getAll)

router.get("/by-genre/:genre", artistsController.findManyByGenre)

router.post("/new", artistsController.create)

router.get("/:id", artistsController.getById)

router.get("/by-email", artistsController.getByEmail)

router.put("/by-update", artistsController.modify)

export default router
