import { RecordArtistRepository } from "Domain"
import {
	ArtistProfileID,
	ErrorHandler,
	EventID,
	GetShortRecordDTO,
	IArtistName,
	RecordID,
} from "Shared"

interface IRecordArtistService extends RecordArtistRepository {}

export class RecordArtistService implements IRecordArtistService {
	private service: IRecordArtistService

	constructor(service: IRecordArtistService) {
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

	async findRecordsByArtist(id: ArtistProfileID): Promise<GetShortRecordDTO[]> {
		try {
			return await this.service.findRecordsByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getArtistsNamesOfRecord(id: RecordID): Promise<IArtistName[]> {
		try {
			return await this.service.getArtistsNamesOfRecord(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
