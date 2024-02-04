import { ErrorHandler, ExpressResponse, ResponseDTO } from "Shared"

export class ApiErrorHandler {
	static async reply(error: any, res: ExpressResponse): Promise<ExpressResponse> {
		const errorMsg = ErrorHandler.handle(error)

		const response = new ResponseDTO(null, errorMsg)

		return res.status(errorMsg.status ? errorMsg.status : 500).send(response)
	}
}
