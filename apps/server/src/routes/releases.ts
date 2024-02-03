import { Router } from "express"
import { controller, authMiddleware, imageStorage, audioStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.releases
const endpts = apiUrlEndpt.releases

router.post(endpts.create, authMiddleware, audioStorage, imageStorage, ctrl.create)
router.put(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.patch(endpts.setPublicStatus, authMiddleware, ctrl.setPublicStatus)
router.get(endpts.get + "id", ctrl.get)
router.get(endpts.getAll, ctrl.getAll)
router.get(endpts.find, ctrl.findMany)

export default router
