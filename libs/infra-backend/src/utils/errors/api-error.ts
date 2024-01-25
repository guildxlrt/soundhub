import { ErrorMsg, ReplyDTO, htmlError } from "Shared"
import { ApiReply } from "../assets"

export class ApiErrHandler {
	static async reply(error: unknown, res: ApiReply) {
		if (error instanceof ErrorMsg && error.status) {
			return res.status(error.status).send(new ReplyDTO(error.message))
		}

		return res.status(500).send(new ReplyDTO(htmlError[500]))
	}
}
