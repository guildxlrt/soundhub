export abstract class InputDTO<D> {
	readonly data: D

	constructor(data: D) {
		this.data = data
	}
}

export class ReplyDTO<D> {
	readonly data: D
	error?: {
		status: number
		message: string
	}

	constructor(data: D) {
		this.data = data
		this.error = undefined
	}

	returnError(status: number, message: string): void {
		this.error = { status: status, message: message }
		return
	}
}
