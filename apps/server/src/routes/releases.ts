import { Router } from "express"
import { audioStorage, authMiddleware, imageStorage } from "Infra-backend"
import { controller } from "Interface-back"
import { apiUrlEndpt } from "Shared"

const router = Router()
const ctrl = controller.releases
const endpts = apiUrlEndpt.releases

router.post(endpts.create, authMiddleware, imageStorage, audioStorage, ctrl.create)
router.put(endpts.edit, authMiddleware, imageStorage, ctrl.edit)
router.patch(endpts.hide, authMiddleware, ctrl.hide)
router.get(endpts.oneByID + "id", ctrl.get)
router.get(endpts.all, ctrl.getAll)
router.get(endpts.manyByArtist + "id", ctrl.findManyByArtist)
router.get(endpts.manyByGenre + "genre", ctrl.findManyByGenre)

export default router
