import { Router } from "express"
import { artistsController } from "../controllers"

const router = Router()

router.get("/", artistsController.getAll)

router.get("/genre/:genre", artistsController.getManyByGenre)

router.post("/new", artistsController.create)

router.get("/:id", artistsController.getById)

router.get("/email", artistsController.getByEmail)

router.put("/update", artistsController.modify)

export default router
