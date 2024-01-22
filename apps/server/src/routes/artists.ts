import { Router } from "express"
import { authMiddleware, Controller, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = Controller.artists()
const endpts = apiUrlEndpt.artists

router.post(endpts.signup, imageStorage, controller.create)
router.put(endpts.modify, authMiddleware, imageStorage, controller.modify)
router.get(endpts.oneByID + "id", controller.getByID)
router.get(endpts.oneByEmail, controller.getByEmail)
router.get(endpts.all, controller.getAll)
router.get(endpts.manyByGenre + "genre", controller.findManyByGenre)

export default router
