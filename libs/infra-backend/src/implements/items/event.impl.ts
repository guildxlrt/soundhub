import { Event, EventRepository } from "Domain"
import {
	CreateEventInputDTO,
	CreateEventReplyDTO,
	DeleteEventInputDTO,
	DeleteEventReplyDTO,
	FindEventsByArtistInputDTO,
	FindEventsByArtistReplyDTO,
	GetAllEventsInputDTO,
	GetAllEventsReplyDTO,
	GetEventInputDTO,
	GetEventReplyDTO,
	ReplyDTO,
} from "Dto"

export class EventImplement implements EventRepository {
	async create(inputs: CreateEventInputDTO): Promise<CreateEventReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}

	async delete(inputs: DeleteEventInputDTO): Promise<DeleteEventReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(undefined)

		return res
	}

	async get(inputs: GetEventInputDTO): Promise<GetEventReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const newArtist = new Event(0, new Date(), new Date(), [], "title", "text", null)
		const res = new ReplyDTO(newArtist)

		return res
	}

	async getAll(inputs: GetAllEventsInputDTO): Promise<GetAllEventsReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByArtist(
		inputs: FindEventsByArtistInputDTO
	): Promise<FindEventsByArtistReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}
}
