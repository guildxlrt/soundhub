import { envs } from "./envs"

export const apiUrlRoot = envs.apiUrl

export const apiUrlPath = {
	auths: "/",
	artists: "/artists",
	releases: "/releases",
	songs: "/songs",
	announces: "/announces",
	events: "/events",
}

export const apiUrlEndpt = {
	auth: {
		login: "/login",
		logout: "/logout",
		changeEmail: "/change-email",
		changePass: "/change-pass",
	},
	artists: {
		signup: "/signup",
		update: "/update",
		get: "/:",
		getAll: "",
		find: "find",
	},
	releases: {
		create: "/create",
		edit: "/edit",
		setPublicStatus: "/set-private-status",
		get: "/:",
		getAll: "",
		find: "find",
	},
	events: {
		create: "/create",
		edit: "/edit",
		delete: "/delete/:",
		get: "/:",
		getAll: "",
		find: "find",
	},
	announces: {
		create: "/create",
		edit: "/edit",
		delete: "/delete/:",
		get: "/:",
		getAll: "",
		find: "find",
	},
	songs: { get: "/:", getAll: "", find: "find" },
}
