import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiEndpts } from "Shared"

const router = Router()
const controller = controllers.releases

router.post(apiEndpts.releases.create, authMiddleware, controller.create)

router.put(apiEndpts.releases.modify, authMiddleware, controller.modify)

router.patch(apiEndpts.releases.hide, authMiddleware, controller.hide)

router.get(apiEndpts.releases.oneById + "id", controller.get)

router.get(apiEndpts.releases.all, controller.getAll)

router.get(apiEndpts.releases.manyByArtist + "id", controller.findManyByArtist)

router.get(apiEndpts.releases.manyByGenre + "genre", controller.findManyByGenre)

export default router
