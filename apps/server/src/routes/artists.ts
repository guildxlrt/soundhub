import { Router } from "express"
import { controllers } from "Controllers"

const router = Router()
const controller = controllers.artists

router.post("/new", controller.create)

router.put("/update", controller.modify)

router.get("/:id", controller.getById)

router.get("/by-email", controller.getByEmail)

router.get("/", controller.getAll)

router.get("/by-genre/:genre", controller.findManyByGenre)

export default router
