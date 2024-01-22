import { Router } from "express"
import { Controller, authMiddleware } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = Controller.auth()
const endpts = apiUrlEndpt.auth

router.post(endpts.login, controller.login)
router.delete(endpts.logout, controller.logout)
router.put(endpts.changeEmail, authMiddleware, controller.changeEmail)
router.put(endpts.changePass, authMiddleware, controller.changePass)

export default router
