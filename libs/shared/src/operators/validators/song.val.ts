import { ErrorMsg } from "../../utils"

// SONG
export class AudioValidator {
	validate(file?: File, backend?: boolean): void {
		try {
			// ...some logic
			console.log(file)

			return
		} catch (error) {
			throw new ErrorMsg("error during Genres format", backend ? 500 : undefined).treatError(
				error
			)
		}
	}
}
