import { ReleaseArtistRepository } from "Domain"
import {
	ArtistProfileID,
	ErrorHandler,
	EventID,
	GetShortReleaseDTO,
	IArtistName,
	ReleaseID,
} from "Shared"

interface IReleaseArtistService extends ReleaseArtistRepository {}

export class ReleaseArtistService implements IReleaseArtistService {
	private service: IReleaseArtistService

	constructor(service: IReleaseArtistService) {
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

	async findReleasesByArtist(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			return await this.service.findReleasesByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getArtistsNamesOfRelease(id: ReleaseID): Promise<IArtistName[]> {
		try {
			return await this.service.getArtistsNamesOfRelease(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
