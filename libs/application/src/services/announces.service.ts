import {
	Announce,
	AnnouncesAddBackRepos,
	AnnouncesAddFrontRepos,
	AnnouncesRepository,
	File,
} from "Domain"
import { ProfileID, AnnounceID, IAnnounceSucc, IAnnouncesListSucc, ErrorHandler } from "Shared"

interface IAnnouncesService
	extends AnnouncesRepository,
		AnnouncesAddBackRepos,
		AnnouncesAddFrontRepos {}

export class AnnouncesService implements IAnnouncesService {
	private service: IAnnouncesService

	constructor(service: IAnnouncesService) {
		this.service = service
	}

	// SERVIVES
	async create(data: Announce, file?: File): Promise<boolean> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async edit(data: Announce, file?: File): Promise<boolean> {
		try {
			return await this.service.edit(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async delete(id: AnnounceID): Promise<void> {
		try {
			return await this.service.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async get(id: ProfileID): Promise<IAnnounceSucc> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<IAnnouncesListSucc> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByArtist(id: ProfileID): Promise<IAnnouncesListSucc> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	// BACKEND
	async getOwner(id: AnnounceID): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getImagePath(id: AnnounceID): Promise<string | null | undefined> {
		try {
			return await this.service.getImagePath(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
