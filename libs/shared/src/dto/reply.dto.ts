import { ErrorMsg } from "../errors"

export class ResponseDTO<D> {
	data: D | null
	error: string | undefined

	constructor(data: D | null, error: ErrorMsg | null) {
		this.data = data
		this.error = error?.message
	}
}
