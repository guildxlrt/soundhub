import { Song, SongRepository } from "Domain"
import {
	FindSongsByArtistInputDTO,
	FindSongsByArtistReplyDTO,
	FindSongsByReleaseInputDTO,
	FindSongsByReleaseReplyDTO,
	GetSongInputDTO,
	GetSongReplyDTO,
	ReplyDTO,
} from "Dto"

export class SongImplement implements SongRepository {
	async get(inputs: GetSongInputDTO): Promise<GetSongReplyDTO> {
		const dbRes = new Song(0, new Date(), 0, "title", "audioUrl", [], undefined)
		const res = new ReplyDTO(dbRes)

		console.log(inputs)
		return res
	}

	async findManyByArtist(inputs: FindSongsByArtistInputDTO): Promise<FindSongsByArtistReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}

	async findManyByRelease(
		inputs: FindSongsByReleaseInputDTO
	): Promise<FindSongsByReleaseReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}
}
