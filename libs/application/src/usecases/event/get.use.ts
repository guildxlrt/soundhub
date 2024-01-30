import { ErrorHandler, EventDTO } from "Shared"
import { IDParamsAdapter, Reply } from "../../assets"
import { EventsService } from "../../services"

export class GetEventUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: IDParamsAdapter): Promise<Reply<EventDTO>> {
		try {
			const id = input.id
			const data = await this.eventsService.get(id)
			return new Reply<EventDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
