import { ErrorMsg, ReplyLayer } from "Shared-utils"

export class ReplyDTO<D> implements ReplyLayer<D> {
	readonly data?: D
	error?: ErrorMsg

	constructor(data?: D, error?: ErrorMsg) {
		this.data = data
		this.error = error
	}
}
