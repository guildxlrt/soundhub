import { Router } from "express"
import { controller, authMiddleware, imageStorage } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.events

const endpts = apiPathEnd.event

router.post(endpts.create, authMiddleware, imageStorage, ctrl.create)
router.get(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.delete(endpts.delete, authMiddleware, ctrl.delete)

export default router
