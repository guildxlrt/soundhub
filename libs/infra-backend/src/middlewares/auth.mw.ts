import { ErrorMsg, htmlError, ApiNext, ApiReply, ApiRequest } from "Shared"
import { Token, ApiErrHandler } from "../utils"

export const authMiddleware = (req: ApiRequest, res: ApiReply, next: ApiNext) => {
	try {
		Token.decode(req)
		if (!req.auth) throw ErrorMsg.htmlError(htmlError[401])

		next()
	} catch (error) {
		ApiErrHandler.reply(error, res)
	}
}
