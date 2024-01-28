import { IDUsecaseParams } from "../../assets"
import { FindEventsByArtistReplyDTO, ErrorMsg } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByArtistUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: IDUsecaseParams): Promise<FindEventsByArtistReplyDTO> {
		try {
			const id = input.id
			return await this.eventsService.findManyByArtist(id)
		} catch (error) {
			return new FindEventsByArtistReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
