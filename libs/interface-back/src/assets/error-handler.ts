import { ErrorMsg, apiErrorMsg } from "Shared"
import { ApiReply } from "./params"

export class ApiErrHandler {
	async reply(error: unknown, res: ApiReply) {
		console.error(error)

		if (error instanceof ErrorMsg && error.status) {
			return res.status(error.status).send(error.message)
		}

		return res.status(500).send(apiErrorMsg.e500)
	}
}

export const errHandler = new ApiErrHandler()
