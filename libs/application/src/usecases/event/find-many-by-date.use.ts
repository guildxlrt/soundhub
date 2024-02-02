import { DateUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler } from "Shared"
import { EventsService } from "../../services"
import { EventShortDTO } from "Shared"

export class FindEventsByDateUsecase {
	mainService: EventsService
	constructor(mainService: EventsService) {
		this.mainService = mainService
	}

	async execute(input: DateUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const { date } = input
			const data = await this.mainService.findManyByDate(date)

			return new UsecaseReply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
