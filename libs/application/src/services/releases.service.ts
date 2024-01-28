import { ReleasesAddBackRepos, ReleasesAddFrontRepos, ReleasesRepository } from "Domain"
import {
	ProfileID,
	ErrorMsg,
	htmlError,
	INewReleaseSucc,
	ReplyLayer,
	ReleaseID,
	IReleaseSucc,
	IReleasesListSucc,
	GenreType,
} from "Shared"

interface IReleasesService
	extends ReleasesRepository,
		ReleasesAddBackRepos,
		ReleasesAddFrontRepos {}

export class ReleasesService implements IReleasesService {
	private service: IReleasesService

	constructor(service: IReleasesService) {
		this.service = service
	}

	// SERVIVES
	async create(release: unknown, songs: unknown[]): Promise<ReplyLayer<INewReleaseSucc>> {
		try {
			return await this.service.create(release, songs)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async edit(release: unknown, songs: unknown[]): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.edit(release, songs)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	async getPrivStatus(id: ReleaseID): Promise<boolean> {
		try {
			return await this.service.getPrivStatus(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	async setPrivStatus(id: ReleaseID, isPublic: boolean): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.setPrivStatus(id, isPublic)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async get(id: ReleaseID): Promise<ReplyLayer<IReleaseSucc>> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getAll(): Promise<ReplyLayer<IReleasesListSucc>> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async findManyByArtist(id: ProfileID): Promise<ReplyLayer<IReleasesListSucc>> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async findManyByGenre(genre: GenreType): Promise<ReplyLayer<IReleasesListSucc>> {
		{
			try {
				return await this.service.findManyByGenre(genre)
			} catch (error) {
				throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
			}
		}
	}
	async getOwner(id: number): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getCoverPath(releaseID: ReleaseID, ownerID: number): Promise<string | null | undefined> {
		try {
			return await this.service.getCoverPath(releaseID, ownerID)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
