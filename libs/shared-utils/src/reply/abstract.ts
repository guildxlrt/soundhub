export abstract class Reply<D> {
	readonly data?: D | undefined
	error?: {
		status: number
		message: string
	}

	constructor(
		data?: D | undefined,
		error?: {
			status: number
			message: string
		}
	) {
		this.data = data
		this.error = error
	}
}
