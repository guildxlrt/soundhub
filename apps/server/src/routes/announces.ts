import { Router } from "express"
import { authMiddleware, controller, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.announces
const endpts = apiUrlEndpt.announces

router.post(endpts.create, authMiddleware, imageStorage, ctrl.create)
router.put(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.delete(endpts.delete + "id", authMiddleware, ctrl.delete)
router.get(endpts.oneByID + "id", ctrl.get)
router.get(endpts.all, ctrl.getAll)
router.get(endpts.manyByArtist + "id", ctrl.findManyByArtist)

export default router
