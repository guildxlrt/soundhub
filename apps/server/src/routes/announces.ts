import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiEndpts } from "Shared"

const router = Router()
const controller = controllers.annonces

router.post(apiEndpts.announces.create, authMiddleware, controller.create)

router.put(apiEndpts.announces.modify, authMiddleware, controller.modify)

router.delete(apiEndpts.announces.delete + "id", authMiddleware, controller.delete)

router.get(apiEndpts.announces.oneById + "id", controller.get)

router.get(apiEndpts.announces.all, controller.getAll)

router.get(apiEndpts.announces.manyByArtist + "id", controller.findManyByArtist)

export default router
