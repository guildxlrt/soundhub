import { DateUsecaseParams } from "../../assets"
import { FindEventsByDateReplyDTO, ErrorMsg, ErrorHandler } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByDateUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: DateUsecaseParams): Promise<FindEventsByDateReplyDTO> {
		try {
			const { date } = input
			const data = await this.eventsService.findManyByDate(date)

			return new FindEventsByDateReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
