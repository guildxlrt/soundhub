import { Event, ExtBackEventsRepos, ExtFrontEventsRepos, EventsRepository, File } from "Domain"
import { UserAuthID, EventID, EventShortDTO, EventDTO, ErrorHandler } from "Shared"

interface IEventsService extends EventsRepository, ExtBackEventsRepos, ExtFrontEventsRepos {}

export class EventsService implements IEventsService {
	private service: IEventsService

	constructor(service: IEventsService) {
		this.service = service
	}

	// SERVIVES
	async create(event: Event, file?: File): Promise<boolean> {
		try {
			return await this.service.create(event, file)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async edit(event: Event, file?: File): Promise<boolean> {
		try {
			return await this.service.edit(event, file)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async delete(id: EventID, userAuth?: UserAuthID): Promise<boolean> {
		try {
			return await this.service.delete(id, userAuth)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async get(id: EventID): Promise<EventDTO> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async getAll(): Promise<EventShortDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async findManyByArtist(id: EventID): Promise<EventShortDTO[]> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async findManyByDate(date: Date): Promise<EventShortDTO[]> {
		try {
			return await this.service.findManyByDate(date)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async findManyByPlace(place: string): Promise<EventShortDTO[]> {
		try {
			return await this.service.findManyByPlace(place)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	// BACKEND
	async getOwner(id: number): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async getImagePath(id: EventID): Promise<string | null | undefined> {
		try {
			return await this.service.getImagePath(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async setImagePath(path: string | null, id: EventID): Promise<boolean> {
		try {
			return await this.service.setImagePath(path, id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
