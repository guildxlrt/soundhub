import { GetAllEventsReplyDTO, ErrorHandler } from "Shared"
import { EventsService } from "../../services"

export class GetAllEventsUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		try {
			const data = await this.eventsService.getAll()
			return new GetAllEventsReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
