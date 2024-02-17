import { envs } from "Shared"

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
		setStatus: "/set-private-status",
	},
	records: {
		create: "/record",
		edit: "/record/:",
		delete: "/record/:",
		publish: "/record/publish/:",
		setStatus: "/record/set-private-status/:",
		get: "/record/:",
		getAll: "/records",
	},
	songs: { add: "/song", edit: "/song/:", remove: "/song/:", get: "/song/:", getAll: "/songs" },
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
		artists: "/search?q=artists",
		labels: "/search?q=labels",
		records: "/search?q=records",
		songs: "/search?q=songs",
		events: "/search?q=events",
		announces: "/search?q=announces",
	},
}

export const apiUriQuery = {
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
