import { Router } from "express"
import { authController } from "Controllers"

const router = Router()

router.post("/login", authController.login)

router.delete("/logout", authController.logout)

router.put("/change-email", authController.changeEmail)

router.put("/change-pass", authController.changePass)

export default router
