import * as express from "express"
import authRoutes from "./auth"
import artistsRoutes from "./artists"
import recordsRoutes from "./records"
import songsRoutes from "./songs"
import announcesRoutes from "./announces"
import eventsRoutes from "./events"
import labelsRoutes from "./label"
import { controller, authMiddleware, imageStorage } from "Interface-back"
import { apiPath, apiPathEnd } from "../config"

const router = express.Router()

const search = apiPathEnd.search
const artist = apiPathEnd.artist

router.get("/", (req, res) => {
	res.send({ message: "Welcome to Soundhub API" })
})

router.use(apiPath.auth, authRoutes)
router.use(apiPath.artist, artistsRoutes)
router.use(apiPath.record, recordsRoutes)
router.use(apiPath.song, songsRoutes)
router.use(apiPath.event, eventsRoutes)
router.use(apiPath.announce, announcesRoutes)
router.use(apiPath.label, labelsRoutes)

// Artist
router.post(artist.signup, imageStorage, controller.artists.create)
router.put(artist.update, authMiddleware, imageStorage, controller.artists.update)
router.patch(artist.setStatus, authMiddleware, controller.artists.setStatus)

// SEARCH
router.use(search.global, controller.search.global)
router.get(search.artists, controller.search.artists)
router.get(search.records, controller.search.records)
router.get(search.events, controller.search.events)
router.get(search.announces, controller.search.announces)
router.get(search.labels, controller.search.labels)
router.get(search.songs, controller.search.songs)

export default router
