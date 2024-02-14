import { ExtBackSongsRepos, ExtFrontSongsRepos, SongsRepository } from "Domain"
import {
	ErrorHandler,
	GenreType,
	ArtistProfileID,
	ReleaseID,
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
	async findByRelease(id: ReleaseID): Promise<GetSongDTO[]> {
		try {
			return await this.service.findByRelease(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByReleaseGenre(genre: GenreType): Promise<GetSongDTO[]> {
		try {
			return await this.service.findByReleaseGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByArtistReleases(id: ArtistProfileID): Promise<GetSongDTO[]> {
		try {
			return await this.service.findByArtistReleases(id)
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

	async getAudioPath(releaseID: ReleaseID): Promise<string | null | undefined> {
		try {
			return await this.service.getAudioPath(releaseID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getReleaseID(releaseID: ReleaseID): Promise<number | undefined> {
		try {
			return await this.service.getReleaseID(releaseID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
