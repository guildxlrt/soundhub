import { Router } from "express"
import { controllers } from "Controllers"

const router = Router()
const controller = controllers.events

router.get("/", controller.getAll)

router.post("/new", controller.create)

router.get("/:id", controller.get)

router.delete("/delete", controller.delete)

router.get("/by-artist/:id/", controller.findManyByArtist)

export default router
