import {
	Announce,
	AnnouncesAddBackRepos,
	AnnouncesAddFrontRepos,
	AnnouncesRepository,
	File,
} from "Domain"
import {
	ProfileID,
	ErrorMsg,
	htmlError,
	ReplyLayer,
	AnnounceID,
	IAnnounceSucc,
	IAnnouncesListSucc,
} from "Shared"

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
	async create(data: Announce, file?: File): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async edit(data: Announce, file?: File): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.edit(data, file)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async delete(id: AnnounceID): Promise<ReplyLayer<void>> {
		try {
			return await this.service.delete(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async get(id: ProfileID): Promise<ReplyLayer<IAnnounceSucc>> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getAll(): Promise<ReplyLayer<IAnnouncesListSucc>> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async findManyByArtist(id: ProfileID): Promise<ReplyLayer<IAnnouncesListSucc>> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getOwner(id: AnnounceID): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getImagePath(id: AnnounceID): Promise<string | null | undefined> {
		try {
			return await this.service.getImagePath(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
