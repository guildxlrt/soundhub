import { Announce, AnnounceRepository } from "Domain"
import {
	CreateAnnounceInputDTO,
	CreateAnnounceReplyDTO,
	DeleteAnnounceInputDTO,
	DeleteAnnounceReplyDTO,
	FindAnnouncesByArtistInputDTO,
	FindAnnouncesByArtistReplyDTO,
	GetAllAnnouncesInputDTO,
	GetAllAnnouncesReplyDTO,
	GetAnnounceInputDTO,
	GetAnnounceReplyDTO,
	ReplyDTO,
} from "Dto"

export class AnnounceImplement implements AnnounceRepository {
	async create(inputs: CreateAnnounceInputDTO): Promise<CreateAnnounceReplyDTO> {
		const res = new ReplyDTO(true)

		console.log(inputs)
		return res
	}

	async delete(inputs: DeleteAnnounceInputDTO): Promise<DeleteAnnounceReplyDTO> {
		const res = new ReplyDTO(undefined)

		console.log(inputs)
		return res
	}

	async get(inputs: GetAnnounceInputDTO): Promise<GetAnnounceReplyDTO> {
		const dbRes = new Announce(0, new Date(), 0, "title", "text", null, null)
		const res = new ReplyDTO(dbRes)

		console.log(inputs)
		return res
	}

	async getAll(inputs: GetAllAnnouncesInputDTO): Promise<GetAllAnnouncesReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}

	async findManyByArtist(
		inputs: FindAnnouncesByArtistInputDTO
	): Promise<FindAnnouncesByArtistReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}
}
