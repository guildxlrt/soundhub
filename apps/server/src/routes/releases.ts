import { Router } from "express"
import { controller, authMiddleware, imageStorage, audioStorage } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.releases
const endpts = apiPathEnd.release

router.post(endpts.create, authMiddleware, audioStorage, imageStorage, ctrl.create)
router.put(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.patch(endpts.setPublicStatus, authMiddleware, ctrl.setPublicStatus)
router.get(endpts.get, ctrl.get)

export default router
