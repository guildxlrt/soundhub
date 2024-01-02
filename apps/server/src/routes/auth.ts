import { Router } from "express"
import { controllers } from "Controllers"

const router = Router()
const controller = controllers.auth

router.post("/login", controller.login)

router.delete("/logout", controller.logout)

router.put("/change-email", controller.changeEmail)

router.put("/change-pass", controller.changePass)

export default router
