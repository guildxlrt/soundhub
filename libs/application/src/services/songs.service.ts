import { Song, ExtBackSongsRepos, ExtFrontSongsRepos, SongsRepository } from "Domain"
import { ErrorHandler, GenreType, ArtistProfileID, ReleaseID, GetSongDTO, SongID } from "Shared"

interface ISongsService extends SongsRepository, ExtBackSongsRepos, ExtFrontSongsRepos {}

export class SongsService implements ISongsService {
	private service: ISongsService

	constructor(service: ISongsService) {
		this.service = service
	}

	// SERVIVES
	async get(id: SongID): Promise<GetSongDTO> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByRelease(id: ReleaseID): Promise<GetSongDTO[]> {
		try {
			return await this.service.findManyByRelease(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByReleaseGenre(genre: GenreType): Promise<GetSongDTO[]> {
		try {
			return await this.service.findManyByReleaseGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByArtist(id: ArtistProfileID) {
		try {
			return await this.service.findManyByArtist(id)
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
