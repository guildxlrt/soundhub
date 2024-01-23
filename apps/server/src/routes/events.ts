import { Router } from "express"
import { authMiddleware, controller, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.events

const endpts = apiUrlEndpt.events

router.post(endpts.create, authMiddleware, imageStorage, ctrl.create)
router.get(endpts.modify, authMiddleware, imageStorage, ctrl.modify)
router.delete(endpts.delete + "id", authMiddleware, ctrl.delete)
router.get(endpts.oneByID + "id", ctrl.get)
router.get(endpts.all, ctrl.getAll)
router.get(endpts.manyByArtist + "id", ctrl.findManyByArtist)
router.get(endpts.manyByDate, ctrl.findManyByDate)
router.get(endpts.manyByPlace, ctrl.findManyByPlace)

export default router
