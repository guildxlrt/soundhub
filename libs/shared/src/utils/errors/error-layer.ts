export class ErrorMsg extends Error {
	status: number
	timestamp: Date

	constructor(status: number, message: string, error?: unknown) {
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
