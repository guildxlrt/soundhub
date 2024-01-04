import { AnnouncesRepository, IdParams, NewAnnounceParams } from "Domain"
import {
	CreateAnnounceReplyDTO,
	DeleteAnnounceReplyDTO,
	FindAnnouncesByArtistReplyDTO,
	GetAllAnnouncesReplyDTO,
	GetAnnounceReplyDTO,
	ReplyDTO,
} from "Dto"

export class AnnouncesImplement implements AnnouncesRepository {
	async create(inputs: NewAnnounceParams): Promise<CreateAnnounceReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO(true)

		return res
	}

	async delete(inputs: IdParams): Promise<DeleteAnnounceReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO(undefined)

		return res
	}

	async get(inputs: IdParams): Promise<GetAnnounceReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO({})

		return res
	}

	async getAll(): Promise<GetAllAnnouncesReplyDTO> {
		// Return Response
		const res: any = new ReplyDTO([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<FindAnnouncesByArtistReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO([])

		return res
	}
}
