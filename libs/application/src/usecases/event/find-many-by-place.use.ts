import { PlaceUsecaseParams, Reply } from "../../assets"
import { ErrorHandler, EventShortDTO } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByPlaceUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: PlaceUsecaseParams): Promise<Reply<EventShortDTO[]>> {
		try {
			const { place } = input

			const data = await this.eventsService.findManyByPlace(place)
			return new Reply<EventShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
