export class ErrorMsg extends Error {
	status: number
	readonly location?: string

	constructor(status: number, message: string, error?: unknown) {
		super(message)
		this.status = status

		if (error instanceof Error) {
			this.message = error.message
		}
	}
}
