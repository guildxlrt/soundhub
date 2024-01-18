import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = controllers.releases
const endpts = apiUrlEndpt.releases

router.post(endpts.create, authMiddleware, controller.create)
router.put(endpts.modify, authMiddleware, controller.modify)
router.patch(endpts.hide, authMiddleware, controller.hide)
router.get(endpts.oneById + "id", controller.get)
router.get(endpts.all, controller.getAll)
router.get(endpts.manyByArtist + "id", controller.findManyByArtist)
router.get(endpts.manyByGenre + "genre", controller.findManyByGenre)

export default router
