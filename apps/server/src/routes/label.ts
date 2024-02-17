import { Router } from "express"
import { controller, authMiddleware, imageStorage } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.labels
const endpts = apiPathEnd.label

router.post(endpts.create, authMiddleware, imageStorage, ctrl.create)
router.put(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.patch(endpts.setStatus, authMiddleware, ctrl.setStatus)

export default router
