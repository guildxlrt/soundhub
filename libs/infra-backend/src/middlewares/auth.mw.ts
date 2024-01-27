import { ErrorMsg, htmlError } from "Shared"
import { Token, ApiErrHandler } from "../utils"
import { ApiNext, ApiReply, ApiRequest } from "../config"

export const authMiddleware = (req: ApiRequest, res: ApiReply, next: ApiNext) => {
	try {
		Token.decode(req)
		if (!req.auth) throw ErrorMsg.htmlError(htmlError[401])

		next()
	} catch (error) {
		ApiErrHandler.reply(error, res)
	}
}
