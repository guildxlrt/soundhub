import { ErrorMsg } from "../errors"

export class ReplyLayer<D> {
	readonly data: D
	error?: ErrorMsg

	constructor(data: D, error?: ErrorMsg) {
		this.data = data
		this.error = error
	}
}
