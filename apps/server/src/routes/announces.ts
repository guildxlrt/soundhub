import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"

const router = Router()
const controller = controllers.annonces

router.post("/new", authMiddleware, controller.create)

router.get("/modify", authMiddleware, controller.modify)

router.delete("/delete", authMiddleware, controller.delete)

router.get("/:id", controller.get)

router.get("/", controller.getAll)

router.get("/by-artist/:id/", controller.findManyByArtist)

export default router
