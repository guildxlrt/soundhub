import { ErrorMsg } from "../errors"

export abstract class ReplyLayer<D> {
	readonly data: D | null
	readonly error: ErrorMsg | null

	constructor(data?: D, error?: ErrorMsg) {
		this.data = data ? data : null
		this.error = error ? error : null
	}
}
