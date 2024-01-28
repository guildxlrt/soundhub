import { Event, EventsAddBackRepos, EventsAddFrontRepos, EventsRepository, File } from "Domain"
import {
	ErrorMsg,
	htmlError,
	ReplyLayer,
	UserAuthID,
	EventID,
	IEventsListSucc,
	IEventSucc,
} from "Shared"

interface IEventsService extends EventsRepository, EventsAddBackRepos, EventsAddFrontRepos {}

export class EventsService implements IEventsService {
	private service: IEventsService

	constructor(service: IEventsService) {
		this.service = service
	}

	// SERVIVES
	async create(data: Event, file?: File): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async edit(data: Event, file?: File): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.edit(data, file)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async delete(id: EventID, userAuth?: UserAuthID): Promise<ReplyLayer<void>> {
		try {
			return await this.service.delete(id, userAuth)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async get(data: EventID): Promise<ReplyLayer<IEventSucc>> {
		try {
			return await this.service.get(data)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getAll(): Promise<ReplyLayer<IEventsListSucc>> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async findManyByArtist(id: EventID): Promise<ReplyLayer<IEventsListSucc>> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async findManyByDate(date: Date): Promise<ReplyLayer<IEventsListSucc>> {
		try {
			return await this.service.findManyByDate(date)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async findManyByPlace(place: string): Promise<ReplyLayer<IEventsListSucc>> {
		try {
			return await this.service.findManyByPlace(place)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getOwner(id: number): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	async getImagePath(id: EventID): Promise<string | null | undefined> {
		try {
			return await this.service.getImagePath(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
