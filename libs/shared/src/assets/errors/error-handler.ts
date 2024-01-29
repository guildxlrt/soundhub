import { envs } from "../../config"
import { DbErrorHandler } from "./db-handler"
import { ErrorMsg } from "./error-layer"

const unknown = {
	client: "Internal Client Error:\n",
	server: "Internal Server Error:\n",
}

export class ErrorHandler {
	static handle(error: unknown): ErrorMsg {
		const dbError = DbErrorHandler.check(error)
		if (dbError) return dbError

		if (error instanceof ErrorMsg) return error
		if (error instanceof Error) return new ErrorMsg(error.message)

		return new ErrorMsg(envs.backend ? unknown.server + error : unknown.client + error)
	}
}
