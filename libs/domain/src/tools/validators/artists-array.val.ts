import { ExtBackArtistsRepos } from "Domain"

import { AnyObject, ErrorHandler, ErrorMsg, InstrumentEnum, htmlError } from "Shared"

export class ArtistsArrayValidator {
	async validateIDs(artists: number[], service: ExtBackArtistsRepos): Promise<void[]> {
		try {
			return Promise.all(
				artists.map(async (id) => {
					const exist = service.verifyExistence(id)
					if (!exist) throw new ErrorMsg("Artist not found", htmlError[422].value)
					else return
				})
			)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during Genres validation")
		}
	}
	async validateMembers(json: Record<string, any>) {
		try {
			const array: AnyObject[] = json?.["members"]

			array.forEach((member) => {
				if (typeof member?.["name"] !== "string")
					throw new ErrorMsg("members names are is not valid", htmlError[422].value)

				const validInstrument = Object.entries(InstrumentEnum).find(
					(element) => element === member?.["instrument"]
				)

				if (!validInstrument)
					throw new ErrorMsg("unknow release type", htmlError[422].value)
			})
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error during Genres validation")
		}
	}
}
