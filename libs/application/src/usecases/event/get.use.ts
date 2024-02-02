import { ErrorHandler, EventDTO } from "Shared"
import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { EventsService } from "../../services"

export class GetEventUsecase {
	mainService: EventsService
	constructor(mainService: EventsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<EventDTO>> {
		try {
			const id = input.id
			const data = await this.mainService.get(id)
			return new UsecaseReply<EventDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
