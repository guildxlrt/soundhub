import { InputsLayer } from "Domain"

export abstract class BasicDTO<D, S> implements InputsLayer<D, S> {
	readonly data: D
	storage?: S
	error?: {
		status: number
		message: string
	}

	constructor(data: D) {
		this.data = data
		this.storage = undefined
		this.error = undefined
	}

	putInStorage(storage: S): void {
		this.storage = storage
		return
	}

	putInError(status: number, message: string): void {
		this.error = { status: status, message: message }
		return
	}
}
