import { Router } from "express"
import { authMiddleware, Controller, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = Controller.annonces()
const endpts = apiUrlEndpt.announces

router.post(endpts.create, authMiddleware, imageStorage, controller.create)
router.put(endpts.modify, authMiddleware, imageStorage, controller.modify)
router.delete(endpts.delete + "id", authMiddleware, controller.delete)
router.get(endpts.oneByID + "id", controller.get)
router.get(endpts.all, controller.getAll)
router.get(endpts.manyByArtist + "id", controller.findManyByArtist)

export default router
