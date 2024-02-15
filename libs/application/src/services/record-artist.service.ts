import { ExtBackRecordArtistRepos, ExtFrontRecordArtistRepos, RecordArtistRepository } from "Domain"
import { ArtistProfileID, ErrorHandler, GetShortRecordDTO, IArtistName, RecordID } from "Shared"

interface IRecordArtistService
	extends RecordArtistRepository,
		ExtBackRecordArtistRepos,
		ExtFrontRecordArtistRepos {}

export class RecordArtistService implements IRecordArtistService {
	private service: IRecordArtistService

	constructor(service: IRecordArtistService) {
		this.service = service
	}

	async addArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean> {
		try {
			return await this.service.addArtists(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async removeArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean> {
		try {
			return await this.service.removeArtists(data)
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

	// BACKEND
	async checkRights(id: number, authID: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, authID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
