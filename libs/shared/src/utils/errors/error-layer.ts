import { StatusType } from "../replies"

export class ErrorMsg extends Error {
	status: StatusType
	timestamp: Date

	constructor(status: StatusType, message: string, error?: unknown) {
		super(message)
		this.status = status
		this.timestamp = new Date()

		if (error instanceof Error) {
			this.message = error.message
			this.name = error.name

			if (error instanceof ErrorMsg) this.status = error.status
		}
	}
}
