import { EventShortDTO } from "Shared"
import { ErrorHandler } from "Shared"
import { EventsService } from "../../services"
import { UsecaseReply } from "../../utils"

export class GetAllEventsUsecase {
	mainService: EventsService
	constructor(mainService: EventsService) {
		this.mainService = mainService
	}

	async execute(): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const data = await this.mainService.getAll()
			return new UsecaseReply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
