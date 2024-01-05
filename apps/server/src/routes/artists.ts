import { Router } from "express"
import { controllers } from "Controllers"
import { authMiddleware } from "Middlewares"

const router = Router()
const controller = controllers.artists

router.post("/signup", controller.create)

router.put("/update", authMiddleware, controller.modify)

router.get("/one-by-id", controller.getById)

router.get("/one-by-email", controller.getByEmail)

router.get("/", controller.getAll)

router.get("/by-genre/:genre", controller.findManyByGenre)

export default router
