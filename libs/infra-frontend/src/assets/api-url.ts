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
	records: {
		create: "/record",
		edit: "/record/:",
		delete: "/record/:",
		publish: "/record/publish/:",
		setPublicStatus: "/record/set-private-status/:",
		get: "/record/:",
		getAll: "/records",
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
		records: "/search?q=records&",
		songs: "/search?q=songs&",
		events: "/search?q=events&",
		announces: "/search?q=announces&",
	},
}

export const apiUriRequest = {
	artistID: "artist-id=",
	artistFeatsID: "artist-feats-id=",
	artistGenre: "artist-genre=",
	recordID: "record-id=",
	recordGenre: "record-genre=",
	recordType: "record-type=",
	date: "date=",
	genre: "genre=",
	place: "place=",
}
