import { PlayAtEventRepository } from "Domain"
import { ArtistProfileID, ErrorHandler, EventID, GenreType } from "Shared"

interface IPlayAtEventService extends PlayAtEventRepository {}

export class PlayAtEventService implements IPlayAtEventService {
	private service: IPlayAtEventService

	constructor(service: IPlayAtEventService) {
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

	async findEventsByArtist(id: EventID): Promise<unknown[]> {
		try {
			return await this.service.findEventsByArtist(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findEventsByArtistGenre(genre: GenreType): Promise<unknown[]> {
		try {
			return await this.service.findEventsByArtistGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
