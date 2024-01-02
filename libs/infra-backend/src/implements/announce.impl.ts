import { Announce, AnnounceRepository } from "Domain"
import {
	CreateAnnounceInputDTO,
	CreateAnnounceReplyDTO,
	DeleteAnnounceInputDTO,
	DeleteAnnounceReplyDTO,
	FindAnnouncesByArtistInputDTO,
	FindAnnouncesByArtistReplyDTO,
	GetAllAnnouncesReplyDTO,
	GetAnnounceInputDTO,
	GetAnnounceReplyDTO,
	ReplyDTO,
} from "Dto"

export class AnnounceImplement implements AnnounceRepository {
	async create(inputs: CreateAnnounceInputDTO): Promise<CreateAnnounceReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}

	async delete(inputs: DeleteAnnounceInputDTO): Promise<DeleteAnnounceReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(undefined)

		return res
	}

	async get(inputs: GetAnnounceInputDTO): Promise<GetAnnounceReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const dbRes = new Announce(0, new Date(), 0, "title", "text", null, null)
		const res = new ReplyDTO(dbRes)

		return res
	}

	async getAll(): Promise<GetAllAnnouncesReplyDTO> {
		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByArtist(
		inputs: FindAnnouncesByArtistInputDTO
	): Promise<FindAnnouncesByArtistReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}
}
