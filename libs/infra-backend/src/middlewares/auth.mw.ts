import { ErrorMsg, htmlError, ApiNext, ApiRes, ApiRequest } from "Shared"
import { Token, ApiErrHandler } from "../utils"

export const authMiddleware = async (req: ApiRequest, res: ApiRes, next: ApiNext) => {
	try {
		Token.decode(req)
		if (!req.auth) throw ErrorMsg.htmlError(htmlError[401])

		next()
	} catch (error) {
		await new ApiErrHandler().reply(error, res)
	}
}
