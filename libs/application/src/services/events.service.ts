import { ExtBackEventsRepos, ExtFrontEventsRepos, EventsRepository } from "Domain"
import { UserAuthID, EventID, ErrorHandler } from "Shared"

interface IEventsService extends EventsRepository, ExtBackEventsRepos, ExtFrontEventsRepos {}

export class EventsService implements IEventsService {
	private service: IEventsService

	constructor(service: IEventsService) {
		this.service = service
	}

	// SERVIVES
	async create(data: unknown): Promise<boolean> {
		try {
			return await this.service.create(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async edit(data: unknown): Promise<boolean> {
		try {
			return await this.service.edit(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async delete(id: EventID, userAuth?: UserAuthID): Promise<boolean> {
		try {
			return await this.service.delete(id, userAuth)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async get(id: EventID): Promise<unknown> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<unknown[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByDate(date: Date): Promise<unknown[]> {
		try {
			return await this.service.findByDate(date)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByPlace(place: string): Promise<unknown[]> {
		try {
			return await this.service.findByPlace(place)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async checkRights(id: number, createdBy: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, createdBy)
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
	async setImagePath(path: string | null, id: EventID): Promise<boolean> {
		try {
			return await this.service.setImagePath(path, id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
