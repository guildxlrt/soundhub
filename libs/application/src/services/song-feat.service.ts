import { SongFeatRepository } from "Domain"
import {
	ArtistProfileID,
	ErrorHandler,
	EventID,
	GetShortReleaseDTO,
	IArtistName,
	SongID,
} from "Shared"

interface ISongFeatService extends SongFeatRepository {}

export class SongFeatService implements ISongFeatService {
	private service: ISongFeatService

	constructor(service: ISongFeatService) {
		this.service = service
	}

	async addArtists(artists: ArtistProfileID[], event: EventID): Promise<boolean> {
		try {
			return await this.service.addArtists(artists, event)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async deleteArtists(artists: ArtistProfileID[], event: EventID): Promise<boolean> {
		try {
			return await this.service.deleteArtists(artists, event)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findSongsByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
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
}
