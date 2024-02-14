import { ExtBackReleasesRepos, ExtFrontReleasesRepos, ReleasesRepository } from "Domain"
import { ReleaseID, GetShortReleaseDTO, GenreType, ErrorHandler, ReleaseType } from "Shared"

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
	async create(release: unknown): Promise<boolean> {
		try {
			return await this.service.create(release)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(release: unknown): Promise<boolean> {
		try {
			return await this.service.edit(release)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: ReleaseID): Promise<boolean> {
		try {
			return await this.service.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async publish(id: ReleaseID): Promise<boolean> {
		try {
			return await this.service.publish(id)
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

	async findByGenre(genre: GenreType): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findByGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByDate(date: Date): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findByDate(date)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByReleaseType(type: ReleaseType): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findByReleaseType(type)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async getEditability(id: number): Promise<boolean> {
		try {
			return await this.service.getEditability(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getOwner(id: number): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getFolderPath(releaseID: ReleaseID): Promise<string | null | undefined> {
		try {
			return await this.service.getFolderPath(releaseID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
