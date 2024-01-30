import { EventShortDTO } from "Shared"
import { ErrorHandler } from "Shared"
import { EventsService } from "../../services"
import { Reply } from "../../assets"

export class GetAllEventsUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(): Promise<Reply<EventShortDTO[]>> {
		try {
			const data = await this.eventsService.getAll()
			return new Reply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
