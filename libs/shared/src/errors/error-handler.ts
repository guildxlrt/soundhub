import { envs } from "../config"
import { ErrorMsg } from "./error-layer"

export class ErrorHandler {
	placeholder?: string
	private default = envs.backend ? "Internal Client Error:\n" : "Internal Server Error:\n"

	constructor(placeholder?: string) {
		this.placeholder = placeholder
	}

	handle(error: any): ErrorMsg {
		if (error instanceof ErrorMsg) return error
		if (error.message) return new ErrorMsg(error.message)

		return new ErrorMsg(this.placeholder ? this.placeholder : this.default)
	}
}
