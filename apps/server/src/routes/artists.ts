import { Router } from "express"
import { controllers, authMiddleware } from "Interface-back"
import { apiEndpts } from "Shared"

const router = Router()
const controller = controllers.artists

router.post(apiEndpts.artists.signup, controller.create)

router.put(apiEndpts.artists.modify, authMiddleware, controller.modify)

router.get(apiEndpts.artists.oneById + "id", controller.getById)

router.get(apiEndpts.artists.oneByEmail, controller.getByEmail)

router.get(apiEndpts.artists.all, controller.getAll)

router.get(apiEndpts.artists.manyByGenre + "genre", controller.findManyByGenre)

export default router
