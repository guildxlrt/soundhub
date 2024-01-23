export interface ApiError {
	value: number
	message: string
}

export interface IApiErrors {
	[key: number]: ApiError
}

export const apiError: IApiErrors = {
	400: {
		value: 400,
		message: "Bad Request",
	},
	401: { value: 401, message: "Unauthorized" },
	403: { value: 403, message: "Forbidden" },
	404: { value: 404, message: "Ressource not fount" },
	405: { value: 405, message: "Request method is not Allowed" },
	409: {
		value: 409,
		message: "A new user cannot be created with this email",
	},
	418: { value: 418, message: "I'm a teapot" },
	500: { value: 500, message: "Internal server error" },
}
