import { Song, SongsAddBackRepos, SongsAddFrontRepos, SongsRepository } from "Domain"
import { ErrorHandler, ISongSucc } from "Shared"

interface ISongsService extends SongsRepository, SongsAddBackRepos, SongsAddFrontRepos {}

export class SongsService implements ISongsService {
	private service: ISongsService

	constructor(service: ISongsService) {
		this.service = service
	}

	// SERVIVES
	async get(id: unknown): Promise<ISongSucc> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async update(data: Song): Promise<void> {
		try {
			return await this.service.update(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
