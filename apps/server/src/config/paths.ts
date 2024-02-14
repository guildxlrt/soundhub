export const apiPath = {
	onRoot: "",
	auth: "/",
	artist: "/artist",
	record: "/record",
	song: "/song",
	announce: "/announce",
	event: "/event",
}

export const apiPathEnd = {
	onRoot: {
		search: "/search?",
		artists: "/artists",
		records: "/records",
		songs: "/songs",
		events: "/events",
		announces: "/announces",
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
	record: {
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
