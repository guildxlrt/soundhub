import { envs } from "../../envs"

export const apiRoot = envs.apiUrl

export const apiPath = {
	auths: "/",
	artists: "/artists",
	releases: "/releases",
	songs: "/songs",
	announces: "/announces",
	events: "/events",
}

export const apiEndpts = {
	auth: {
		login: "/login",
		logout: "/logout",
		changeEmail: "/change-email",
		changePass: "/change-pass",
	},
	artists: {
		signup: "/signup",
		modify: "/update",
		oneById: "/:",
		oneByEmail: "/by-email",
		all: "/",
		manyByGenre: "/by-genre/:",
	},
	releases: {
		create: "/new",
		modify: "/edit",
		hide: "/hide",
		oneById: "/:",
		all: "/",
		manyByArtist: "/by-artist/:",
		manyByGenre: "/by-genre/:",
	},
	events: {
		create: "/new",
		modify: "/edit",
		delete: "/delete",
		oneById: "/:",
		all: "/",
		manyByArtist: "/by-artist/:",
		manyByDate: "/by-date",
		manyByPlace: "/by-place",
	},
	announces: {
		create: "/new",
		modify: "/edit",
		delete: "/delete/:",
		oneById: "/:",
		all: "/",
		manyByArtist: "/by-artist/:",
	},
	songs: { oneById: "/:" },
}
