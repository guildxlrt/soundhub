import { ExtBackSongFeatRepos, ExtFrontSongFeatRepos, SongFeatRepository } from "Domain"
import { ArtistProfileID, ErrorHandler, GetShortRecordDTO, IArtistName, SongID } from "Shared"

interface ISongFeatService
	extends SongFeatRepository,
		ExtBackSongFeatRepos,
		ExtFrontSongFeatRepos {}

export class SongFeatService implements ISongFeatService {
	private service: ISongFeatService

	constructor(service: ISongFeatService) {
		this.service = service
	}

	async addArtists(input: { song: number; artists: number[] }): Promise<boolean> {
		try {
			return await this.service.addArtists(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async removeArtists(input: { song: number; artists: number[] }): Promise<boolean> {
		try {
			return await this.service.removeArtists(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findSongsByArtistFeats(id: ArtistProfileID): Promise<GetShortRecordDTO[]> {
		try {
			return await this.service.findSongsByArtistFeats(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getArtistsNamesOfSong(id: SongID): Promise<IArtistName[]> {
		try {
			return await this.service.getArtistsNamesOfSong(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async checkRights(id: number, createdBy: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, createdBy)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
