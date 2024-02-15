import { ExtBackPlayAtEventRepos, PlayAtEventRepository } from "Domain"
import { ErrorHandler, EventID, GenreType } from "Shared"

interface IPlayAtEventService extends PlayAtEventRepository, ExtBackPlayAtEventRepos {}

export class PlayAtEventService implements IPlayAtEventService {
	private service: IPlayAtEventService

	constructor(service: IPlayAtEventService) {
		this.service = service
	}

	async addArtists(input: { artists: number[]; event: number }): Promise<boolean> {
		try {
			return await this.service.addArtists(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async removeArtists(input: { artists: number[]; event: number }): Promise<boolean> {
		try {
			return await this.service.removeArtists(input)
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

	// BACKEND
	async checkRights(id: number, authID: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, authID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
