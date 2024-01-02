import { ErrorMsg } from "Shared-utils"

export abstract class InputDTO<D> {
	readonly data: D

	constructor(data: D) {
		this.data = data
	}
}

export abstract class InputFileDTO<D> extends InputDTO<D> {
	readonly file?: File

	constructor(data: D, file?: File) {
		super(data)
		this.file = file
	}
}

export class ReplyDTO<D> {
	readonly data: D | undefined
	error?: ErrorMsg

	constructor(data: D | undefined, error?: ErrorMsg) {
		this.data = data
		this.error = error
	}
}
