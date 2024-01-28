import { DateUsecaseParams } from "../../assets"
import { FindEventsByDateReplyDTO, ErrorMsg } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByDateUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: DateUsecaseParams): Promise<FindEventsByDateReplyDTO> {
		try {
			const { date } = input
			return await this.eventsService.findManyByDate(date)
		} catch (error) {
			return new FindEventsByDateReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
