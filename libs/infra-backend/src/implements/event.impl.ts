import { EventsRepository, IdParams, NewEventParams } from "Domain"
import {
	CreateEventReplyDTO,
	DeleteEventReplyDTO,
	FindEventsByArtistReplyDTO,
	GetAllEventsReplyDTO,
	GetEventReplyDTO,
	ReplyDTO,
} from "Dto"

export class EventsImplement implements EventsRepository {
	async create(inputs: NewEventParams): Promise<CreateEventReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}

	async delete(inputs: IdParams): Promise<DeleteEventReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(undefined)

		return res
	}

	async get(inputs: IdParams): Promise<GetEventReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO({})

		return res
	}

	async getAll(): Promise<GetAllEventsReplyDTO> {
		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<FindEventsByArtistReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}
}
