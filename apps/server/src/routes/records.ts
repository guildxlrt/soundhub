import { Router } from "express"
import { controller, authMiddleware, imageStorage, audioStorage } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.records
const endpts = apiPathEnd.record

router.post(endpts.create, authMiddleware, audioStorage, imageStorage, ctrl.create)
router.put(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.patch(endpts.setStatus, authMiddleware, ctrl.setStatus)
router.get(endpts.delete, ctrl.delete)
router.get(endpts.get, ctrl.get)

export default router
