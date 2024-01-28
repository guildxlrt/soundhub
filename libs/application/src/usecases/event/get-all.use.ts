import { GetAllEventsReplyDTO, ErrorMsg } from "Shared"
import { EventsService } from "../../services"

export class GetAllEventsUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		try {
			return await this.eventsService.getAll()
		} catch (error) {
			return new GetAllEventsReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
