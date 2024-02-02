import { ApiErrHandler, JwtService } from "Infra-backend"
import { NextResponse, ExpressRequest, ExpressResponse, ErrorMsg, htmlError } from "Shared"

export const authMiddleware = async (req: ExpressRequest, res: ExpressResponse, next: NextResponse) => {
	try {
		JwtService.decode(req)
		if (!req.auth) throw ErrorMsg.htmlError(htmlError[401])

		next()
	} catch (error) {
		await new ApiErrHandler().reply(error, res)
	}
}
