import { AnnoncesController } from "./announces.ctrl"
import { ArtistsController } from "./artists.ctrl"
import { UserAuthController } from "./user-auth.ctrl"
import { EventsController } from "./events.ctrl"
import { ReleasesController } from "./releases.ctrl"
import { SongsController } from "./songs.ctrl"

export class Controller {
	static annonces() {
		return new AnnoncesController()
	}
	static artists() {
		return new ArtistsController()
	}
	static auth() {
		return new UserAuthController()
	}
	static events() {
		return new EventsController()
	}
	static releases() {
		return new ReleasesController()
	}
	static songs() {
		return new SongsController()
	}
}
