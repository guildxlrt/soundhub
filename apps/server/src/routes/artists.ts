import { Router } from "express"
import { artistsController } from "Controllers"

const router = Router()
router.post("/new", artistsController.create)

router.put("/by-update", artistsController.modify)

router.get("/:id", artistsController.getById)

router.get("/by-email", artistsController.getByEmail)

router.get("/", artistsController.getAll)

router.get("/by-genre/:genre", artistsController.findManyByGenre)

export default router
