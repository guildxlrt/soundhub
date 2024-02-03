import { Router } from "express"
import { controller, authMiddleware } from "Interface-back"

import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.auth
const endpts = apiUrlEndpt.auth

router.post(endpts.login, ctrl.login)
router.delete(endpts.logout, ctrl.logout)
router.put(endpts.changeEmail, authMiddleware, ctrl.changeEmail)
router.put(endpts.changePass, authMiddleware, ctrl.changePass)

export default router
