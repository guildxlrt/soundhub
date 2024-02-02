import { ExtBackArtistsRepos } from "Domain"
import { ErrorHandler, ErrorMsg, htmlError } from "../../errors"
import { AnyObject, InstrumentEnum } from "../../types"

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
			throw new ErrorHandler().handle(error).setMessage("error during Genres validation")
		}
	}
	async validateMembers(array: AnyObject[]) {
		try {
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
			throw new ErrorHandler().handle(error).setMessage("error during Genres validation")
		}
	}
}
