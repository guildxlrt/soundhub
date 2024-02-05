import { ErrorMsg } from "Shared"

export class UsecaseReply<D> {
	readonly data: D | null
	readonly error: ErrorMsg | null

	constructor(data: D | null, error: ErrorMsg | null) {
		this.data = data ? data : null
		this.error = error ? error : null
	}
}
