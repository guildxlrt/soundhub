import { envs } from "../../../shared/src/config/envs"

export const apiUrlRoot = envs.apiUrl

export const apiUrlPath = {
	auth: {
		login: "/login",
		logout: "/logout",
		changeEmail: "/change-email",
		changePass: "/change-pass",
	},
	artists: {
		signup: "/signup",
		update: "/update",
		getById: "/artist/:",
		getAll: "/artists",
		getByEmail: "/find?email=",
		setPublicStatus: "/set-private-status",
	},
	releases: {
		create: "/release",
		edit: "/release/:",
		delete: "/release/:",
		publish: "/release/publish/:",
		setPublicStatus: "/release/set-private-status/:",
		get: "/release/:",
		getAll: "/releases",
	},
	songs: { add: "/song", edit: "/song/:", delete: "/song/:", get: "/song/:", getAll: "/songs" },
	events: {
		create: "/event",
		edit: "/event/:",
		delete: "/event/:",
		get: "/event/:",
		getAll: "/events",
	},
	announces: {
		create: "/announce",
		edit: "/announce/:",
		delete: "/announce/:",
		get: "/announce/:",
		getAll: "/announces",
	},
	search: {
		artists: "/search?q=artists&",
		releases: "/search?q=releases&",
		songs: "/search?q=songs&",
		events: "/search?q=events&",
		announces: "/search?q=announces&",
	},
}

export const apiUriRequest = {
	artistID: "artist-id=",
	artistFeatsID: "artist-feats-id=",
	artistGenre: "artist-genre=",
	releaseID: "release-id=",
	releaseGenre: "release-genre=",
	releaseType: "release-type=",
	date: "date=",
	genre: "genre=",
	place: "place=",
}
