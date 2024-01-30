import { DateParamsAdapter, Reply } from "../../assets"
import { ErrorHandler } from "Shared"
import { EventsService } from "../../services"
import { EventShortDTO } from "Shared"

export class FindEventsByDateUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: DateParamsAdapter): Promise<Reply<EventShortDTO[]>> {
		try {
			const { date } = input
			const data = await this.eventsService.findManyByDate(date)

			return new Reply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
