import { Router } from "express"
import { annoncesController } from "Controllers"

const router = Router()

router.get("/", annoncesController.getAll)

router.post("/new", annoncesController.create)

router.get("/:id", annoncesController.get)

router.delete("/delete", annoncesController.delete)

router.get("/artist/:id/", annoncesController.getManyByArtist)

export default router
