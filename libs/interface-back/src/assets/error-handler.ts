import { ErrorHandler, ErrorMsg, ExpressResponse, ResponseDTO } from "Shared"

export class ApiErrorHandler {
	async reply(error: unknown, res: ExpressResponse): Promise<ExpressResponse> {
		const errorMsg = ErrorHandler.handle(error)
		const response = new ResponseDTO<ErrorMsg>(errorMsg)
		const status = errorMsg.status

		return res.status(status ? status : 500).send(response)
	}
}
