import { Router } from "express"
import { authMiddleware, imageStorage } from "Infra-backend"
import { controller } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.events

const endpts = apiUrlEndpt.events

router.post(endpts.create, authMiddleware, imageStorage, ctrl.create)
router.get(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.delete(endpts.delete + "id", authMiddleware, ctrl.delete)
router.get(endpts.oneByID + "id", ctrl.get)
router.get(endpts.all, ctrl.getAll)
router.get(endpts.manyByArtist + "id", ctrl.findManyByArtist)
router.get(endpts.manyByDate, ctrl.findManyByDate)
router.get(endpts.manyByPlace, ctrl.findManyByPlace)

export default router
