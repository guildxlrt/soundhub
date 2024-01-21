import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = controllers.annonces
const endpts = apiUrlEndpt.announces

router.post(endpts.create, authMiddleware, controller.create)
router.put(endpts.modify, authMiddleware, controller.modify)
router.delete(endpts.delete + "id", authMiddleware, controller.delete)
router.get(endpts.oneByID + "id", controller.get)
router.get(endpts.all, controller.getAll)
router.get(endpts.manyByArtist + "id", controller.findManyByArtist)

export default router
