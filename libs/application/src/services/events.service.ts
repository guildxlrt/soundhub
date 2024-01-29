import { Event, EventsAddBackRepos, EventsAddFrontRepos, EventsRepository, File } from "Domain"
import { UserAuthID, EventID, IEventsListSucc, IEventSucc, ErrorHandler } from "Shared"

interface IEventsService extends EventsRepository, EventsAddBackRepos, EventsAddFrontRepos {}

export class EventsService implements IEventsService {
	private service: IEventsService

	constructor(service: IEventsService) {
		this.service = service
	}

	// SERVIVES
	async create(data: Event, file?: File): Promise<boolean> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async edit(data: Event, file?: File): Promise<boolean> {
		try {
			return await this.service.edit(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async delete(id: EventID, userAuth?: UserAuthID): Promise<void> {
		try {
			return await this.service.delete(id, userAuth)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async get(data: EventID): Promise<IEventSucc> {
		try {
			return await this.service.get(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<IEventsListSucc> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByArtist(id: EventID): Promise<IEventsListSucc> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByDate(date: Date): Promise<IEventsListSucc> {
		try {
			return await this.service.findManyByDate(date)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByPlace(place: string): Promise<IEventsListSucc> {
		try {
			return await this.service.findManyByPlace(place)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async getOwner(id: number): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getImagePath(id: EventID): Promise<string | null | undefined> {
		try {
			return await this.service.getImagePath(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
