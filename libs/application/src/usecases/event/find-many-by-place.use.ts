import { PlaceUsecaseParams } from "../../assets"
import { FindEventsByPlaceReplyDTO, ErrorMsg } from "Shared"
import { EventsService } from "../../services"

export class FindEventsByPlaceUsecase {
	eventsService: EventsService
	constructor(eventsService: EventsService) {
		this.eventsService = eventsService
	}

	async execute(input: PlaceUsecaseParams): Promise<FindEventsByPlaceReplyDTO> {
		try {
			const { place } = input

			return await this.eventsService.findManyByPlace(place)
		} catch (error) {
			return new FindEventsByPlaceReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
