export const apiPath = {
	onRoot: "",
	auth: "/",
	artist: "/artist",
	record: "/record",
	song: "/song",
	announce: "/announce",
	event: "/event",
	label: "/label",
}

export const apiPathEnd = {
	onRoot: {
		search: "/search?",
		artists: "/artists?",
		records: "/records?",
		songs: "/songs",
		events: "/events?",
		announces: "/announces?",
		labels: "/labels?",
		signup: "/signup",
		update: "/update",
		setStatus: "/set-status",
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
		setStatus: "/set-status",
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
	label: {
		create: "/create",
		edit: "/edit",
		delete: "/delete/:",
		get: "/:id",
		setStatus: "/set-private-status/:",
	},
	songs: { get: "/:id", getAll: "" },
}
