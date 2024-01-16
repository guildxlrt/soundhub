import * as express from "express"
import authRoutes from "./auth"
import artistsRoutes from "./artists"
import releasesRoutes from "./releases"
import songsRoutes from "./songs"
import announcesRoutes from "./announces"
import eventsRoutes from "./events"
import { apiPath } from "Shared"

const router = express.Router()

router.get("/", (req, res) => {
	console.log("Hello API")
	res.send({ message: "Hello API" })
})

router.use(apiPath.auths, authRoutes)
router.use(apiPath.artists, artistsRoutes)
router.use(apiPath.releases, releasesRoutes)
router.use(apiPath.songs, songsRoutes)
router.use(apiPath.events, eventsRoutes)
router.use(apiPath.announces, announcesRoutes)

export default router
