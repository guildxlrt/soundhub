import { ApiNext, ApiReply, ApiRequest, Token, errHandler } from "../assets"

export const authMiddleware = (req: ApiRequest, res: ApiReply, next: ApiNext) => {
	try {
		new Token().decode(req)

		next()
	} catch (error) {
		errHandler.reply(error, res)
	}
}
