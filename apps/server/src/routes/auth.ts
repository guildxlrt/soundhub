import { Router } from "express"
import { controller, authMiddleware } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.auth
const endpts = apiPathEnd.auth

router.post(endpts.login, ctrl.login)
router.delete(endpts.logout, ctrl.logout)
router.put(endpts.changeEmail, authMiddleware, ctrl.changeEmail)
router.put(endpts.changePass, authMiddleware, ctrl.changePass)

export default router
