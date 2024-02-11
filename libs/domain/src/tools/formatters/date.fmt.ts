import { ErrorHandler, ErrorMsg, htmlError } from "Shared"

export class DateFormatter {
	format(value: string | number | Date): Date {
		try {
			const date = new Date(value)
			const isValidDate = !isNaN(date.getTime())
			if (!isValidDate) throw new ErrorMsg("unknow release type", htmlError[422].value)

			return new Date(date)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during date validation")
		}
	}
}
