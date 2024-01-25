import * as express from "express"
import authRoutes from "./auth"
import artistsRoutes from "./artists"
import releasesRoutes from "./releases"
import songsRoutes from "./songs"
import announcesRoutes from "./announces"
import eventsRoutes from "./events"
import { apiUrlPath } from "Shared"

const router = express.Router()

router.get("/", (req, res) => {
	console.log("Hello API")
	res.send({ message: "Hello API" })
})

router.use(apiUrlPath.auths, authRoutes)
router.use(apiUrlPath.artists, artistsRoutes)
router.use(apiUrlPath.releases, releasesRoutes)
router.use(apiUrlPath.songs, songsRoutes)
router.use(apiUrlPath.events, eventsRoutes)
router.use(apiUrlPath.announces, announcesRoutes)

export default router
