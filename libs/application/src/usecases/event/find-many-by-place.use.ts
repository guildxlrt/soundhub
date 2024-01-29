import { PlaceUsecaseParams } from "../../assets"
import { FindEventsByPlaceReplyDTO, ErrorHandler } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByPlaceUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: PlaceUsecaseParams): Promise<FindEventsByPlaceReplyDTO> {
		try {
			const { place } = input

			const data = await this.eventsService.findManyByPlace(place)
			return new FindEventsByPlaceReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
