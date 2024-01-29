import { IDUsecaseParams } from "../../assets"
import { FindEventsByArtistReplyDTO, ErrorMsg, ErrorHandler } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByArtistUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: IDUsecaseParams): Promise<FindEventsByArtistReplyDTO> {
		try {
			const id = input.id

			const data = await this.eventsService.findManyByArtist(id)
			return new FindEventsByArtistReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
