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
	search: {
		global: "/search?",
		artists: "/artists?",
		records: "/records?",
		songs: "/songs",
		events: "/events?",
		announces: "/announces?",
		labels: "/labels?",
	},
	auth: {
		login: "/login",
		logout: "/logout",
		changeEmail: "/change-email",
		changePass: "/change-pass",
	},
	artist: {
		signup: "/signup",
		update: "/update",
		setStatus: "/set-status",
		getByID: "/:id",
		getByEmail: "/email",
	},
	record: {
		create: "/create",
		edit: "/edit",
		setStatus: "/set-status",
		delete: "/delete",
		get: "/:id",
	},
	songs: { search: "/:id", get: "/:id", add: "add/:id", edit: "edit/:id", delete: "delete/:id" },
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
		setStatus: "/set-private-status/:",
		get: "/:id",
	},
}
