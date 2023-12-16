import { Event, EventRepository } from "Domain"
import {
	CreateEventDTO,
	DeleteEventsDTO,
	FindEventsByArtistDTO,
	GetAllEventsDTO,
	GetEventDTO,
} from "Dto"

export class EventImplement implements EventRepository {
	async create(inputs: CreateEventDTO): Promise<CreateEventDTO> {
		inputs.putInStorage(true)

		return inputs
	}

	async delete(inputs: DeleteEventsDTO): Promise<DeleteEventsDTO> {
		inputs.putInStorage()

		return inputs
	}

	async get(inputs: GetEventDTO): Promise<GetEventDTO> {
		const dbRes: any = {}

		inputs.putInStorage(dbRes)

		return inputs
	}

	async getAll(inputs: GetAllEventsDTO): Promise<GetAllEventsDTO> {
		const dbRes: Event[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}

	async findManyByArtist(inputs: FindEventsByArtistDTO): Promise<FindEventsByArtistDTO> {
		const dbRes: Event[] = []

		inputs.putInStorage(dbRes)

		return inputs
	}
}
