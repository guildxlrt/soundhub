import { Router } from "express"
import { controller, authMiddleware, imageStorage } from "Interface-back"

import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.events

const endpts = apiUrlEndpt.events

router.post(endpts.create, authMiddleware, imageStorage, ctrl.create)
router.get(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.delete(endpts.delete + "id", authMiddleware, ctrl.delete)
router.get(endpts.getAll, ctrl.getAll)
router.get(endpts.find, ctrl.findMany)

export default router
