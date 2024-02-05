import { Router } from "express"
import { controller } from "Interface-back"
import { apiPathEnd } from "../config"

const router = Router()
const ctrl = controller.songs
const endpts = apiPathEnd.songs

router.get(endpts.get, ctrl.get)

export default router
