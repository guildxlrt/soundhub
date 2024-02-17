import { AnnoncesController } from "./announces.ctrl"
import { ArtistsController } from "./artists.ctrl"
import { UserAuthController } from "./user-auth.ctrl"
import { EventsController } from "./events.ctrl"
import { RecordsController } from "./records.ctrl"
import { SongsController } from "./songs.ctrl"
import { SearchController } from "./search.ctrl"
import { LabelsController } from "./labels.ctrl"

export const controller = {
	announces: new AnnoncesController(),
	artists: new ArtistsController(),
	auth: new UserAuthController(),
	events: new EventsController(),
	records: new RecordsController(),
	songs: new SongsController(),
	labels: new LabelsController(),
	search: new SearchController(),
}
