import * as express from "express"
import artists from "./artists"
import releases from "./releases"

const router = express.Router()

router.use("/", (req, res) => {
	res.send({ message: "Hello API" })
})

router.use("/artists", artists)
router.use("/releases", releases)

export default router
