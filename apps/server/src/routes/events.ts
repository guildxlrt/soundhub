import { Router } from "express"
import { eventsController } from "Controllers"

const router = Router()

router.get("/", eventsController.getAll)

router.post("/new", eventsController.create)

router.get("/:id", eventsController.get)

router.delete("/delete", eventsController.delete)

router.get("/by-artist/:id/", eventsController.findManyByArtist)

export default router
