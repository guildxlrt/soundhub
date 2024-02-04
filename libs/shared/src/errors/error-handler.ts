import { envs } from "../config"
import { ErrorMsg } from "./error-layer"

export class ErrorHandler {
	static handle(error: any, placeholder?: string): ErrorMsg {
		if (error instanceof ErrorMsg) return error
		if (error.message) return new ErrorMsg(error.message)

		const defaultMsg = envs.backend ? "Internal Client Error:\n" : "Internal Server Error:\n"
		return new ErrorMsg(placeholder ? placeholder : defaultMsg)
	}
}
