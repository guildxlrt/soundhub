import { ExtBackSongsRepos, ExtFrontSongsRepos, SongsRepository } from "Domain"
import { ErrorHandler, GenreType, ArtistProfileID, RecordID, GetSongDTO, SongID } from "Shared"

interface ISongsService extends SongsRepository, ExtBackSongsRepos, ExtFrontSongsRepos {}

export class SongsService implements ISongsService {
	private service: ISongsService

	constructor(service: ISongsService) {
		this.service = service
	}

	// SERVIVES
	async add(song: unknown): Promise<boolean> {
		try {
			return await this.service.add(song)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(song: unknown): Promise<boolean> {
		try {
			return await this.service.edit(song)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: SongID): Promise<boolean> {
		try {
			return await this.service.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: SongID): Promise<unknown> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async search(
		recordID: RecordID,
		artistID: ArtistProfileID,
		genre: GenreType
	): Promise<GetSongDTO[]> {
		try {
			return await this.service.search(recordID, artistID, genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async checkRights(id: number, createdBy: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, createdBy)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAudioPath(recordID: RecordID): Promise<string | null | undefined> {
		try {
			return await this.service.getAudioPath(recordID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getRecordID(recordID: RecordID): Promise<number | undefined> {
		try {
			return await this.service.getRecordID(recordID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
