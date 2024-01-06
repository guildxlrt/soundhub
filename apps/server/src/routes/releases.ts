import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"

const router = Router()
const controller = controllers.releases

router.post("/new", authMiddleware, controller.create)

router.put("/edit", authMiddleware, controller.modifyPrice)

router.get("/:id", controller.get)

router.get("/", controller.getAll)

router.get("/by-artist/:id/", controller.findManyByArtist)

router.get("/by-genre/:genre/", controller.findManyByGenre)

export default router
