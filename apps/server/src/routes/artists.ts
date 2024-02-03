import { Router } from "express"
import { controller, authMiddleware, imageStorage } from "Interface-back"

import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.artists
const endpts = apiUrlEndpt.artists

router.post(endpts.signup, imageStorage, ctrl.create)
router.put(endpts.update, authMiddleware, imageStorage, ctrl.update)
router.get(endpts.get + "id", ctrl.get)
router.get(endpts.getAll, ctrl.getAll)
router.get(endpts.find, ctrl.findMany)

export default router
