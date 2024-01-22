import { Router } from "express"
import { authMiddleware, Controller, audioStorage, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const controller = Controller.releases()
const endpts = apiUrlEndpt.releases

router.post(endpts.create, authMiddleware, imageStorage, audioStorage, controller.create)
router.put(endpts.modify, authMiddleware, imageStorage, controller.modify)
router.patch(endpts.hide, authMiddleware, controller.hide)
router.get(endpts.oneByID + "id", controller.get)
router.get(endpts.all, controller.getAll)
router.get(endpts.manyByArtist + "id", controller.findManyByArtist)
router.get(endpts.manyByGenre + "genre", controller.findManyByGenre)

export default router
