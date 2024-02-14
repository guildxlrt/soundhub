import {
	AnyObject,
	ErrorHandler,
	ErrorMsg,
	InstrumentType,
	ValidInstruments,
	htmlError,
} from "Shared"

export class ArrayValidator {
	validateMembers(json: Record<string, any>): void {
		try {
			const array = json as AnyObject[]

			array.forEach((member: AnyObject) => {
				// NAME
				if (typeof member?.["name"] !== "string")
					throw new ErrorMsg(
						`member name isn't valid : ${member?.["name"]}`,
						htmlError[422].value
					)

				// INSTRUMENTS
				const instruments: InstrumentType[] = member?.["instruments"]

				instruments.map((instrument) => {
					const isValid = ValidInstruments.find((element) => element === instrument)

					if (!isValid)
						throw new ErrorMsg(
							`member instrument isn't valid : ${member?.["instrument"]}`,
							htmlError[422].value
						)
				})
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
