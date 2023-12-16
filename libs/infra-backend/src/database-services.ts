import {
	UserAuthImplement,
	ArtistImplement,
	ReleaseImplement,
	EventImplement,
	SongImplement,
	AnnounceImplement,
} from "./implements"

const userAuthImplement = new UserAuthImplement()
const artistImplement = new ArtistImplement()
const releaseImplement = new ReleaseImplement()
const songImplement = new SongImplement()
const announceImplement = new AnnounceImplement()
const eventImplement = new EventImplement()

export const databaseServices = {
	userAuth: userAuthImplement,
	artist: artistImplement,
	release: releaseImplement,
	song: songImplement,
	announce: announceImplement,
	event: eventImplement,
}

export type DatabaseServices = typeof databaseServices
