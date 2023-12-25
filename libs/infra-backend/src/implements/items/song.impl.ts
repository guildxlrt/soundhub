import { Song, SongRepository } from "Domain"
import { GetSongInputDTO, GetSongReplyDTO, ReplyDTO } from "Dto"

export class SongImplement implements SongRepository {
	async get(inputs: GetSongInputDTO): Promise<GetSongReplyDTO> {
		const dbRes = new Song(0, new Date(), 0, "title", "audioUrl", [], undefined)
		const res = new ReplyDTO(dbRes)

		console.log(inputs)
		return res
	}
}
