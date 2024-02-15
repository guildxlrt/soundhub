import * as express from "express"
import authRoutes from "./auth"
import artistsRoutes from "./artists"
import recordsRoutes from "./records"
import songsRoutes from "./songs"
import announcesRoutes from "./announces"
import eventsRoutes from "./events"
import labelsRoutes from "./label"
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
router.get(endpts.artists, ctrl.artists.search)
router.get(endpts.records, ctrl.records.search)
router.get(endpts.events, ctrl.events.search)
router.get(endpts.announces, ctrl.announces.search)
router.get(endpts.labels, ctrl.labels.search)

// User
router.post(endpts.signup, imageStorage, ctrl.artists.create)
router.put(endpts.update, authMiddleware, imageStorage, ctrl.artists.update)
router.patch(endpts.setStatus, authMiddleware, ctrl.artists.setStatus)

// specifics
router.use(apiPath.onRoot, announcesRoutes)
router.use(apiPath.auth, authRoutes)
router.use(apiPath.artist, artistsRoutes)
router.use(apiPath.record, recordsRoutes)
router.use(apiPath.song, songsRoutes)
router.use(apiPath.event, eventsRoutes)
router.use(apiPath.announce, announcesRoutes)
router.use(apiPath.label, labelsRoutes)

export default router
