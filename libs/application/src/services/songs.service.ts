import { Song, SongsAddBackRepos, SongsAddFrontRepos, SongsRepository } from "Domain"
import { ErrorHandler, ReleaseID, SongDTO, SongID } from "Shared"

interface ISongsService extends SongsRepository, SongsAddBackRepos, SongsAddFrontRepos {}

export class SongsService implements ISongsService {
	private service: ISongsService

	constructor(service: ISongsService) {
		this.service = service
	}

	// SERVIVES
	async get(id: SongID): Promise<SongDTO> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async findByRelease(id: ReleaseID): Promise<SongDTO[]> {
		try {
			return await this.service.findByRelease(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async update(data: Song): Promise<boolean> {
		try {
			return await this.service.update(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
