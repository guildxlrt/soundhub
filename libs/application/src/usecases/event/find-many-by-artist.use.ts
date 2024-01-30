import { IDUsecaseParams, Reply } from "../../assets"
import { ErrorHandler, EventShortDTO } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByArtistUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: IDUsecaseParams): Promise<Reply<EventShortDTO[]>> {
		try {
			const id = input.id

			const data = await this.eventsService.findManyByArtist(id)
			return new Reply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
