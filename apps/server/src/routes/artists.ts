import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = controllers.artists
const endpts = apiUrlEndpt.artists

router.post(endpts.signup, controller.create)
router.put(endpts.modify, authMiddleware, controller.modify)
router.get(endpts.oneByID + "id", controller.getByID)
router.get(endpts.oneByEmail, controller.getByEmail)
router.get(endpts.all, controller.getAll)
router.get(endpts.manyByGenre + "genre", controller.findManyByGenre)

export default router
