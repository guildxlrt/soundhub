import { PlaceUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler, EventShortDTO } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByPlaceUsecase {
	mainService: EventsService
	constructor(mainService: EventsService) {
		this.mainService = mainService
	}

	async execute(input: PlaceUsecaseParams): Promise<UsecaseReply<EventShortDTO[]>> {
		try {
			const { place } = input

			const data = await this.mainService.findManyByPlace(place)
			return new UsecaseReply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
