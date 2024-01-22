import { Router } from "express"
import { authMiddleware, Controller, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = Controller.events()

const endpts = apiUrlEndpt.events

router.post(endpts.create, authMiddleware, imageStorage, controller.create)
router.get(endpts.modify, authMiddleware, imageStorage, controller.modify)
router.delete(endpts.delete + "id", authMiddleware, controller.delete)
router.get(endpts.oneByID + "id", controller.get)
router.get(endpts.all, controller.getAll)
router.get(endpts.manyByArtist + "id", controller.findManyByArtist)
router.get(endpts.manyByDate, controller.findManyByDate)
router.get(endpts.manyByPlace, controller.findManyByPlace)

export default router
