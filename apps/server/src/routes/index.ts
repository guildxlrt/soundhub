import * as express from "express"
import authRoutes from "./auth"
import artistsRoutes from "./artists"
import releasesRoutes from "./releases"
import songsRoutes from "./songs"
import announcesRoutes from "./announces"
import eventsRoutes from "./events"

const router = express.Router()

router.get("/", (req, res) => {
	console.log("Hello API")
	res.send({ message: "Hello API" })
})

router.use("/", authRoutes)
router.use("/artists", artistsRoutes)
router.use("/releases", releasesRoutes)
router.use("/songs", songsRoutes)
router.use("/events", eventsRoutes)
router.use("/announces", announcesRoutes)

export default router
