import { ErrorMsg } from "Shared-utils"

export class ReplyDTO<D> {
	readonly data: D | undefined
	error?: ErrorMsg

	constructor(data: D | undefined, error?: ErrorMsg) {
		this.data = data
		this.error = error
	}
}
