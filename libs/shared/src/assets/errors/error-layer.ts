import { StatusType } from "../types"
import { HtmlError } from "./html-err"

export class ErrorMsg extends Error {
	readonly timestamp: Date
	status?: StatusType

	constructor(message: string, status?: number) {
		super(message)
		this.timestamp = new Date()
		this.status = status ? status : null
	}

	treatError(error: unknown) {
		if (error instanceof Error) {
			this.message = error.message
			this.name = error.name

			if (error instanceof ErrorMsg) this.status = error.status
		}
	}

	static htmlError(htmlError: HtmlError) {
		return new ErrorMsg(htmlError.message, htmlError.value)
	}
}
