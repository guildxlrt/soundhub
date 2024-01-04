import { ErrorMsg, Reply } from "Shared-utils"

export class ReplyDTO<D> extends Reply<D> {
	override readonly data?: D
	override error?: ErrorMsg

	constructor(data?: D, error?: ErrorMsg) {
		super(data, error)
	}
}
