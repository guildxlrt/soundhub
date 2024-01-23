import { ErrorMsg, apiErrorMsg } from "Shared"
import { ApiNext, ApiReply, ApiRequest, Token, ApiErrHandler } from "../../assets"

export const authMiddleware = (req: ApiRequest, res: ApiReply, next: ApiNext) => {
	try {
		Token.decode(req)
		if (!req.auth) throw new ErrorMsg(401, apiErrorMsg.e401)

		next()
	} catch (error) {
		ApiErrHandler.reply(error, res)
	}
}
