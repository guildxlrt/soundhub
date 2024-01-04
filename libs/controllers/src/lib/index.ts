import { AnnoncesController } from "./announces.ctrl"
import { ArtistsController } from "./artists.ctrl"
import { UserAuthController } from "./user-auth.ctrl"
import { EventsController } from "./events.ctrl"
import { ReleasesController } from "./releases.ctrl"
import { SongsController } from "./songs.ctrl"

export const controllers = {
	annonces: new AnnoncesController(),
	artists: new ArtistsController(),
	auth: new UserAuthController(),
	events: new EventsController(),
	releases: new ReleasesController(),
	songs: new SongsController(),
}
