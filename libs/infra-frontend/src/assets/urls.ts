import { envs } from "Shared"

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
		oneById: "/one-by-id",
		oneByEmail: "/one-by-email",
		all: "/",
		manyByGenre: "/by-genre/:genre",
	},
	releases: {
		create: "/new",
		modify: "/edit",
		hide: "/hide",
		oneById: "/:id",
		all: "/",
		manyByArtist: "/by-artist/:id",
		manyByGenre: "/by-genre/:genre",
	},
	events: {
		create: "/new",
		modify: "/edit",
		delete: "/delete",
		oneById: "/:id",
		all: "/",
		manyByArtist: "/by-artist/:id",
		manyByDate: "/by-date/:date",
		manyByPlace: "/by-place/:place",
	},
	announces: {
		create: "/new",
		modify: "/edit",
		delete: "/delete",
		oneById: "/:id",
		all: "/",
		manyByArtist: "/by-artist/:id",
	},
	songs: { oneById: "/:id" },
}
