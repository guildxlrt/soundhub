import { Router } from "express"
import { controllers } from "Controllers"

const router = Router()
const controller = controllers.releases

router.get("/", controller.getAll)

router.post("/new", controller.create)

router.get("/:id", controller.get)

router.put("/edit", controller.modifyPrice)

router.get("/by-artist/:id/", controller.findManyByArtist)

router.get("/by-genre/:genre/", controller.findManyByGenre)

export default router
