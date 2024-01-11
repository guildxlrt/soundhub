import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiEndpts } from "libs/infra-frontend/src/assets"

const router = Router()
const controller = controllers.artists

router.post(apiEndpts.artists.signup, controller.create)

router.put(apiEndpts.artists.modify, authMiddleware, controller.modify)

router.get(apiEndpts.artists.oneById, controller.getById)

router.get(apiEndpts.artists.oneByEmail, controller.getByEmail)

router.get(apiEndpts.artists.all, controller.getAll)

router.get(apiEndpts.artists.manyByGenre, controller.findManyByGenre)

export default router
