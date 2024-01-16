import { ErrorMsg, apiErrorMsg } from "Shared"
import { ApiNext, ApiReply, ApiRequest, Token, errHandler } from "../../assets"

export const authMiddleware = (req: ApiRequest, res: ApiReply, next: ApiNext) => {
	try {
		new Token().decode(req)
		if (!req.auth) throw new ErrorMsg(401, apiErrorMsg.e401)

		next()
	} catch (error) {
		errHandler.reply(error, res)
	}
}
