import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = controllers.auth
const endpts = apiUrlEndpt.auth

router.post(endpts.login, controller.login)
router.delete(endpts.logout, controller.logout)
router.put(endpts.changeEmail, authMiddleware, controller.changeEmail)
router.put(endpts.changePass, authMiddleware, controller.changePass)

export default router
