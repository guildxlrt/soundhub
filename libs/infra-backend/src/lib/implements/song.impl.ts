import { IdParams, SongsRepository } from "Domain"
import { Reply } from "../../assets"
import { ISongSucc } from "Shared-utils"

export class SongsImplement implements SongsRepository {
	async get(inputs: IdParams): Promise<Reply<ISongSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply({})

		return res
	}
}
