import { ExtBackSongsRepos, ExtFrontSongsRepos, SongsRepository } from "Domain"
import {
	ErrorHandler,
	GenreType,
	ArtistProfileID,
	RecordID,
	GetSongDTO,
	SongID,
	IGetFullSongSuccess,
	GetFullSongDTO,
} from "Shared"

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
	async findByRecord(id: RecordID): Promise<GetSongDTO[]> {
		try {
			return await this.service.findByRecord(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByRecordGenre(genre: GenreType): Promise<GetSongDTO[]> {
		try {
			return await this.service.findByRecordGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByArtistRecords(id: ArtistProfileID): Promise<GetSongDTO[]> {
		try {
			return await this.service.findByArtistRecords(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getEditability(id: number): Promise<boolean> {
		try {
			return await this.service.getEditability(id)
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
