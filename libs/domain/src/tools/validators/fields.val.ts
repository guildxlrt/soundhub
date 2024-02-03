import { ReleaseEnum, ErrorHandler, ErrorMsg, htmlError } from "Shared"

export class FieldsValidator {
	place(value: unknown): void {
		try {
			if (typeof value !== "string")
				throw new ErrorMsg("place is not valid", htmlError[422].value)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during place validation")
		}
	}
	price(value: unknown): void {
		try {
			if (typeof value !== "number")
				throw new ErrorMsg("Price is not valid", htmlError[422].value)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during price validation")
		}
	}
	date(value: string | number | Date): void {
		try {
			const date = new Date(value)
			const isValidDate = !isNaN(date.getTime())
			if (!isValidDate) throw new ErrorMsg("unknow release type", htmlError[422].value)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during date validation")
		}
	}

	releaseType(value: unknown): void {
		try {
			const validType = Object.entries(ReleaseEnum).find((element) => element === value)

			if (!validType) throw new ErrorMsg("unknow release type", htmlError[422].value)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during release validation")
		}
	}
}
