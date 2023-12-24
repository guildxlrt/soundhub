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
		const res = new ReplyDTO(true)

		console.log(inputs)
		return res
	}

	async delete(inputs: DeleteEventInputDTO): Promise<DeleteEventReplyDTO> {
		const res = new ReplyDTO(undefined)

		console.log(inputs)
		return res
	}

	async get(inputs: GetEventInputDTO): Promise<GetEventReplyDTO> {
		const newArtist = new Event(0, new Date(), new Date(), [], "title", "text", null)
		const res = new ReplyDTO(newArtist)

		console.log(inputs)
		return res
	}

	async getAll(inputs: GetAllEventsInputDTO): Promise<GetAllEventsReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}

	async findManyByArtist(
		inputs: FindEventsByArtistInputDTO
	): Promise<FindEventsByArtistReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}
}
