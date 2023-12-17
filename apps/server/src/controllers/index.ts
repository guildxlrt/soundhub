import * as express from "express"
import auth from "./auth"
import artists from "./artists"
import releases from "./releases"
import songs from "./songs"
import announces from "./announces"
import events from "./events"

const router = express.Router()

router.use("/", (req, res) => {
	res.send({ message: "Hello API" })
})

router.use("/auth", auth)
router.use("/artists", artists)
router.use("/releases", releases)
router.use("/songs", songs)
router.use("/events", events)
router.use("/announces", announces)

export default router
