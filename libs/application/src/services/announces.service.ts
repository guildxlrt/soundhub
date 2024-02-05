import {
	Announce,
	ExtBackAnnouncesRepo,
	ExtFrontAnnouncesRepos,
	AnnouncesRepository,
	File,
} from "Domain"
import {
	ArtistProfileID,
	AnnounceID,
	ErrorHandler,
	GetAnnounceDTO,
	GetAnnounceShortDTO,
} from "Shared"

interface IAnnouncesService
	extends AnnouncesRepository,
		ExtBackAnnouncesRepo,
		ExtFrontAnnouncesRepos {}

export class AnnouncesService implements IAnnouncesService {
	private service: IAnnouncesService

	constructor(service: IAnnouncesService) {
		this.service = service
	}

	// SERVIVES
	async create(announce: Announce, file?: File): Promise<boolean> {
		try {
			return await this.service.create(announce, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async edit(announce: Announce, file?: File): Promise<boolean> {
		try {
			return await this.service.edit(announce, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async delete(id: AnnounceID): Promise<boolean> {
		try {
			return await this.service.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async get(id: ArtistProfileID): Promise<GetAnnounceDTO> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<GetAnnounceShortDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByArtist(id: ArtistProfileID): Promise<GetAnnounceShortDTO[]> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByDate(date: Date): Promise<GetAnnounceShortDTO[]> {
		try {
			return await this.service.findManyByDate(date)
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

	async setImagePath(path: string | null, id: AnnounceID): Promise<boolean> {
		try {
			return await this.service.setImagePath(path, id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
