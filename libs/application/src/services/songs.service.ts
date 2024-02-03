import { Song, ExtBackSongsRepos, ExtFrontSongsRepos, SongsRepository } from "Domain"
import { ErrorHandler, GenreType, ProfileID, ReleaseID, SongDTO, SongID } from "Shared"

interface ISongsService extends SongsRepository, ExtBackSongsRepos, ExtFrontSongsRepos {}

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
			throw ErrorHandler.handle(error)
		}
	}
	async findByRelease(id: ReleaseID): Promise<SongDTO[]> {
		try {
			return await this.service.findByRelease(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByReleaseGenre(genre: GenreType): Promise<SongDTO[]> {
		try {
			return await this.service.findByReleaseGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByArtist(id: ProfileID) {
		try {
			return await this.service.findByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async update(song: Song): Promise<boolean> {
		try {
			return await this.service.update(song)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
