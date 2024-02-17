import { envs } from "../../../shared/src/config/envs"

export const apiUrlRoot = envs.apiUrl

export const apiUrlsearch = {
	artists: "/search?q=artists",
	records: "/search?q=records",
	songs: "/search?q=songs",
	events: "/search?q=events",
	announces: "/search?q=announces",
}

export const apiUriRequest = {
	artistID: "&artist-id=",
	artistFeatsID: "&artist-feats-id=",
	artistGenre: "&artist-genre=",
	recordID: "&record-id=",
	recordGenre: "&record-genre=",
	recordType: "&record-type=",
	date: "&date=",
	genre: "&genre=",
	place: "&place=",
	country: "&country=",
}
