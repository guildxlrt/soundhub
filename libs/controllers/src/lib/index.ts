import { AnnoncesController } from "./announces"
import { ArtistsController } from "./artists"
import { AuthController } from "./auth"
import { EventsController } from "./events"
import { ReleasesController } from "./releases"
import { SongsController } from "./songs"

export const annoncesController = new AnnoncesController()
export const artistsController = new ArtistsController()
export const authController = new AuthController()
export const eventsController = new EventsController()
export const releasesController = new ReleasesController()
export const songsController = new SongsController()
