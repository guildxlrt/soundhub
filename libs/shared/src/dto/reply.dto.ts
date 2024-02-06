import { ErrorMsg } from "../errors"

export class ResponseDTO<D> {
	data: D | null
	error: string | undefined

	constructor(data: D | null, error: ErrorMsg | null) {
		this.data = data
		this.error = error?.message
	}
}

export class SearchResponseDTO<D> {
	results: D[] | null
	errors: string[] | undefined

	constructor(results: D[] | null, errors: ErrorMsg[] | null) {
		this.results = results
		this.errors = errors?.map((error) => {
			return error.message
		})
	}
}
