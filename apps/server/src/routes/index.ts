import * as express from "express"
import authRoutes from "./auth"
import artistsRoutes from "./artists"
import recordsRoutes from "./records"
import songsRoutes from "./songs"
import announcesRoutes from "./announces"
import eventsRoutes from "./events"
import { apiPath, apiPathEnd } from "../config"
import { controller, authMiddleware, imageStorage } from "Interface-back"

const router = express.Router()

const endpts = apiPathEnd.onRoot
const ctrl = controller

router.get("/", (req, res) => {
	console.log("Hello API")
	res.send({ message: "Hello API" })
})
router.use(endpts.search, ctrl.search.findMany)
router.get(endpts.artists, ctrl.artists.getAll)
router.get(endpts.records, ctrl.records.getAll)
router.get(endpts.events, ctrl.events.getAll)
router.get(endpts.announces, ctrl.announces.getAll)

// User
router.post(endpts.signup, imageStorage, ctrl.artists.create)
router.put(endpts.update, authMiddleware, imageStorage, ctrl.artists.update)
router.patch(endpts.setPublicStatus, authMiddleware, ctrl.artists.setPublicStatus)

// specifics
router.use(apiPath.onRoot, announcesRoutes)
router.use(apiPath.auth, authRoutes)
router.use(apiPath.artist, artistsRoutes)
router.use(apiPath.record, recordsRoutes)
router.use(apiPath.song, songsRoutes)
router.use(apiPath.event, eventsRoutes)
router.use(apiPath.announce, announcesRoutes)

export default router
