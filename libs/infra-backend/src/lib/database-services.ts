import {
	UserAuthsImplement,
	ArtistsImplement,
	ReleasesImplement,
	EventsImplement,
	SongsImplement,
	AnnouncesImplement,
} from "./implements"

export const databaseServices = {
	userAuths: new UserAuthsImplement(),
	artists: new ArtistsImplement(),
	releases: new ReleasesImplement(),
	songs: new SongsImplement(),
	announces: new AnnouncesImplement(),
	events: new EventsImplement(),
}

export type DatabaseServices = typeof databaseServices
