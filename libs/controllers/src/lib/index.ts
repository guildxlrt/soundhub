import { AnnoncesController } from "./announces"
import { ArtistsController } from "./artists"
import { UserAuthController } from "./user-auth"
import { EventsController } from "./events"
import { ReleasesController } from "./releases"
import { SongsController } from "./songs"

export const controllers = {
	annonces: new AnnoncesController(),
	artists: new ArtistsController(),
	auth: new UserAuthController(),
	events: new EventsController(),
	releases: new ReleasesController(),
	songs: new SongsController(),
}
