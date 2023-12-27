import { Song, SongRepository } from "Domain"
import { GetSongInputDTO, GetSongReplyDTO, ReplyDTO } from "Dto"

export class SongImplement implements SongRepository {
	async get(inputs: GetSongInputDTO): Promise<GetSongReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const dbRes = new Song(0, new Date(), 0, "title", "audioUrl", [], null)
		const res = new ReplyDTO(dbRes)

		return res
	}
}
