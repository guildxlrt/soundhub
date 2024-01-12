import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiEndpts } from "Shared"

const router = Router()
const controller = controllers.events

router.post(apiEndpts.events.create, authMiddleware, controller.create)

router.get(apiEndpts.events.modify, authMiddleware, controller.modify)

router.delete(apiEndpts.events.delete + "id", authMiddleware, controller.delete)

router.get(apiEndpts.events.oneById + "id", controller.get)

router.get(apiEndpts.events.all, controller.getAll)

router.get(apiEndpts.events.manyByArtist + "id", controller.findManyByArtist)

router.get(apiEndpts.events.manyByDate, controller.findManyByDate)

router.get(apiEndpts.events.manyByPlace, controller.findManyByPlace)

export default router
