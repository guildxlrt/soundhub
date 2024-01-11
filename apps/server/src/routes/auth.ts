import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiEndpts } from "libs/infra-frontend/src/assets"

const router = Router()
const controller = controllers.auth

router.post(apiEndpts.auth.login, controller.login)

router.delete(apiEndpts.auth.logout, controller.logout)

router.put(apiEndpts.auth.changeEmail, authMiddleware, controller.changeEmail)

router.put(apiEndpts.auth.changePass, authMiddleware, controller.changePass)

export default router
