import { Router } from "express"
import { authMiddleware, controller, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.artists
const endpts = apiUrlEndpt.artists

router.post(endpts.signup, imageStorage, ctrl.create)
router.put(endpts.modify, authMiddleware, imageStorage, ctrl.modify)
router.get(endpts.oneByID + "id", ctrl.getByID)
router.get(endpts.oneByEmail, ctrl.getByEmail)
router.get(endpts.all, ctrl.getAll)
router.get(endpts.manyByGenre + "genre", ctrl.findManyByGenre)

export default router
