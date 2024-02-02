import { ErrorHandler, ErrorMsg, ResponseDTO } from "Shared"
import { DbErrorHandler } from "../../prisma"
import { ExpressResponse } from "../../express"

export class ApiError extends ErrorMsg {
	override status: number
	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

export class ApiErrHandler extends ErrorHandler {
	async reply(error: unknown, res: ExpressResponse): Promise<ExpressResponse> {
		const errorMsg = this.handle(error)
		const response = new ResponseDTO<ErrorMsg>(errorMsg)
		const status = errorMsg.status

		return res.status(status ? status : 500).send(response)
	}

	handleDBError(error: unknown): ErrorMsg {
		const dbError = new DbErrorHandler().check(error)
		if (dbError) return dbError
		else return this.handle(error)
	}
}
