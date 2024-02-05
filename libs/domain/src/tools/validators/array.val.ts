import { ExtBackArtistsRepos } from "Domain"

import {
	AnyObject,
	ErrorHandler,
	ErrorMsg,
	InstrumentType,
	ValidInstruments,
	htmlError,
} from "Shared"

export class ArrayValidator {
	async validateIDs(artists: number[], service: ExtBackArtistsRepos): Promise<void[]> {
		try {
			return await Promise.all(
				artists.map(async (id) => {
					const exist = await service.verifyExistence(id)
					if (!exist) throw new ErrorMsg("Artist not found", htmlError[422].value)
					else return
				})
			)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error with ID's array")
		}
	}
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
