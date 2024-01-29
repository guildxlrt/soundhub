import { GetEventReplyDTO, ErrorHandler } from "Shared"
import { IDUsecaseParams } from "../../assets"
import { EventsService } from "../../services"

export class GetEventUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: IDUsecaseParams): Promise<GetEventReplyDTO> {
		try {
			const id = input.id
			const data = await this.eventsService.get(id)
			return new GetEventReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
