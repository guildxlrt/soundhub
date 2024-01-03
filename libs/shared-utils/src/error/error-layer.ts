export class ErrorMsg extends Error {
	status: number

	constructor(status: number, message: string, error?: unknown) {
		super(message)
		this.status = status

		if (error instanceof Error) {
			this.message = error.message
			this.name = error.name

			if (error instanceof ErrorMsg) this.status = error.status
		}
	}
}
