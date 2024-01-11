import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiEndpts } from "libs/infra-frontend/src/assets"

const router = Router()
const controller = controllers.annonces

router.post(apiEndpts.announces.create, authMiddleware, controller.create)

router.get(apiEndpts.announces.modify, authMiddleware, controller.modify)

router.delete(apiEndpts.announces.delete, authMiddleware, controller.delete)

router.get(apiEndpts.announces.oneById, controller.get)

router.get(apiEndpts.announces.all, controller.getAll)

router.get(apiEndpts.announces.manyByArtist, controller.findManyByArtist)

export default router
