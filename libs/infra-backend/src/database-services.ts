import {
	UserAuthImplement,
	ArtistImplement,
	ReleaseImplement,
	EventImplement,
	SongImplement,
	AnnounceImplement,
} from "./implements"

export const databaseServices = {
	userAuth: new UserAuthImplement(),
	artist: new ArtistImplement(),
	release: new ReleaseImplement(),
	song: new SongImplement(),
	announce: new AnnounceImplement(),
	event: new EventImplement(),
}

export type DatabaseServices = typeof databaseServices
