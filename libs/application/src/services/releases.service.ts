import { ExtBackReleasesRepos, ExtFrontReleasesRepos, ReleasesRepository } from "Domain"
import {
	ArtistProfileID,
	ReleaseID,
	GetShortReleaseDTO,
	GenreType,
	ErrorHandler,
	ReleaseType,
} from "Shared"

interface IReleasesService
	extends ReleasesRepository,
		ExtBackReleasesRepos,
		ExtFrontReleasesRepos {}

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
			throw ErrorHandler.handle(error)
		}
	}
	async edit(release: unknown, songs?: unknown[]): Promise<boolean> {
		try {
			return await this.service.edit(release, songs)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getPublicStatus(id: ReleaseID): Promise<boolean> {
		try {
			return await this.service.getPublicStatus(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setPublicStatus(id: ReleaseID, isPublic?: boolean): Promise<boolean> {
		try {
			return await this.service.setPublicStatus(id, isPublic)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async get(id: ReleaseID): Promise<unknown> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByArtist(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findManyByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findManyByArtistFeats(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findManyByGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByDate(date: Date): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findManyByDate(date)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByReleaseType(type: ReleaseType): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findManyByReleaseType(type)
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
	async getCoverPath(releaseID: ReleaseID): Promise<string | null | undefined> {
		try {
			return await this.service.getCoverPath(releaseID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setCoverPath(path: string | null, id: ReleaseID): Promise<boolean> {
		try {
			return await this.service.setCoverPath(path, id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
