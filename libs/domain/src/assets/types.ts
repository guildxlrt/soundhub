import {
	AnnouncesRepository,
	ArtistsRepository,
	EventsRepository,
	ReleasesRepository,
	SongsRepository,
	UserAuthsRepository,
} from "Domain"

export type ServicesType = {
	userAuths: UserAuthsRepository
	artists: ArtistsRepository
	releases: ReleasesRepository
	songs: SongsRepository
	announces: AnnouncesRepository
	events: EventsRepository
}
