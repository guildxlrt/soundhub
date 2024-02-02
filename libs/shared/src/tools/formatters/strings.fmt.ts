import { ErrorHandler, ErrorMsg, htmlError } from "../../errors"

export class StringFormatter {
	short(value: unknown): string {
		try {
			if (typeof value !== "string")
				throw new ErrorMsg("title is not valid ", htmlError[422].value)
			else return value
		} catch (error) {
			throw new ErrorHandler().handle(error).setMessage("error during Genres validation")
		}
	}

	long(value: unknown): string {
		try {
			if (typeof value !== "string")
				throw new ErrorMsg("text is not valid", htmlError[422].value)
			else return value
		} catch (error) {
			throw new ErrorHandler().handle(error).setMessage("error during Genres validation")
		}
	}
}
