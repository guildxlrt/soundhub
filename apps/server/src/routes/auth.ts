import { Router } from "express"
import { controllers } from "Controllers"
import { authMiddleware } from "Middlewares"

const router = Router()
const controller = controllers.auth

router.post("/login", controller.login)

router.delete("/logout", controller.logout)

router.put("/change-email", authMiddleware, controller.changeEmail)

router.put("/change-pass", authMiddleware, controller.changePass)

export default router
