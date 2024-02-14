import { RecordEnum, ErrorHandler, ErrorMsg, htmlError } from "Shared"

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

	recordType(value: unknown): void {
		try {
			const validType = Object.entries(RecordEnum).find((element) => element === value)

			if (!validType) throw new ErrorMsg("unknow record type", htmlError[422].value)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during record validation")
		}
	}
}
