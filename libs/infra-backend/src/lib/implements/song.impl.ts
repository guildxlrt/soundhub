import { IdParams, SongsRepository } from "Domain"
import { GetSongReplyDTO, ReplyDTO } from "Dto"

export class SongsImplement implements SongsRepository {
	async get(inputs: IdParams): Promise<GetSongReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO({})

		return res
	}
}
