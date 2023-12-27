export abstract class InputDTO<D> {
	readonly data: D

	constructor(data: D) {
		this.data = data
	}
}

export class ReplyDTO<D> {
	readonly data: D | undefined
	error?: {
		status: number
		message: string
	}

	constructor(
		data: D | undefined,
		error?: {
			status: number
			message: string
		}
	) {
		this.data = data
		this.error = error
	}
}
