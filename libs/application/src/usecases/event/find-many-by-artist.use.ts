import { IDUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler, EventShortDTO } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByArtistUsecase {
	mainService: EventsService
	constructor(mainService: EventsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const id = input.id

			const data = await this.mainService.findManyByArtist(id)
			return new UsecaseReply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
