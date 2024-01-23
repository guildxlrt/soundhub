import { Router } from "express"
import { authMiddleware, controller, audioStorage, imageStorage } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.releases
const endpts = apiUrlEndpt.releases

router.post(endpts.create, authMiddleware, imageStorage, audioStorage, ctrl.create)
router.put(endpts.modify, authMiddleware, imageStorage, ctrl.modify)
router.patch(endpts.hide, authMiddleware, ctrl.hide)
router.get(endpts.oneByID + "id", ctrl.get)
router.get(endpts.all, ctrl.getAll)
router.get(endpts.manyByArtist + "id", ctrl.findManyByArtist)
router.get(endpts.manyByGenre + "genre", ctrl.findManyByGenre)

export default router
