import { envs } from "../config"
import { StatusType } from "../types"
import { HtmlError, htmlError } from "./html-err"

export class ErrorMsg extends Error {
	readonly timestamp: Date
	status?: StatusType
	override readonly name: string

	constructor(message: string, status?: number) {
		super(message)
		this.timestamp = new Date()
		this.status = status ? status : null
		this.name = envs.backend ? "ApiError" : "ClientError"

		if (!status) {
			if (envs.backend) this.status = htmlError[500].value
			if (envs.backend !== true) this.status = null
		} else this.status = status
	}

	static htmlError(htmlError: HtmlError) {
		return new ErrorMsg(htmlError.message, htmlError.value)
	}

	setMessage(message: string): this {
		this.message = message

		return this
	}

	setStatus(status: number): this {
		this.status = status

		return this
	}
}
