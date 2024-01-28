import { GetEventReplyDTO, ErrorMsg } from "Shared"
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
			return await this.eventsService.get(id)
		} catch (error) {
			return new GetEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
