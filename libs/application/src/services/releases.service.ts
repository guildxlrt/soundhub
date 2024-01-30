import { ReleasesAddBackRepos, ReleasesAddFrontRepos, ReleasesRepository } from "Domain"
import {
	ProfileID,
	ReleaseID,
	GetReleaseDTO,
	ReleaseShortDTO,
	GenreType,
	ErrorHandler,
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
	async create(release: unknown, songs: unknown[]): Promise<boolean> {
		try {
			return await this.service.create(release, songs)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async edit(release: unknown, songs?: unknown[]): Promise<boolean> {
		try {
			return await this.service.edit(release, songs)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async getPrivStatus(id: ReleaseID): Promise<boolean> {
		try {
			return await this.service.getPrivStatus(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async setPrivStatus(id: ReleaseID, isPublic: boolean): Promise<boolean> {
		try {
			return await this.service.setPrivStatus(id, isPublic)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async get(id: ReleaseID): Promise<GetReleaseDTO> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async getAll(): Promise<ReleaseShortDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async findManyByArtist(id: ProfileID): Promise<ReleaseShortDTO[]> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async findManyByGenre(genre: GenreType): Promise<ReleaseShortDTO[]> {
		try {
			return await this.service.findManyByGenre(genre)
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
	async getCoverPath(releaseID: ReleaseID): Promise<string | null | undefined> {
		try {
			return await this.service.getCoverPath(releaseID)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async setCoverPath(path: string | null, id: ReleaseID): Promise<boolean> {
		try {
			return await this.service.setCoverPath(path, id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
