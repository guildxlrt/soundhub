export const apiPath = {
	onRoot: "",
	auth: "/",
	artist: "/artist",
	release: "/release",
	song: "/song",
	announce: "/announce",
	event: "/event",
}

export const apiPathEnd = {
	onRoot: {
		artists: "/artists",
		releases: "/releases",
		songs: "/songs",
		events: "/events",
		announces: "/announces",
		search: "/search?",
		signup: "/signup",
		update: "/update",
		setPublicStatus: "/set-private-status",
	},
	auth: {
		login: "/login",
		logout: "/logout",
		changeEmail: "/change-email",
		changePass: "/change-pass",
	},
	artist: {
		getByID: "/:id",
		getByEmail: "/email",
	},
	release: {
		create: "/create",
		edit: "/edit",
		setPublicStatus: "/set-private-status",
		get: "/:id",
	},
	event: {
		create: "/create",
		edit: "/edit",
		delete: "/delete/:",
		get: "/:id",
	},
	announce: {
		create: "/create",
		edit: "/edit",
		delete: "/delete/:",
		get: "/:id",
	},
	songs: { get: "/:id", getAll: "" },
}
