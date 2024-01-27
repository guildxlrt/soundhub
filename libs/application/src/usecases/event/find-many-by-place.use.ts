import { UsecaseLayer, RepositoriesType, PlaceUsecaseParams } from "../../assets"
import { FindEventsByPlaceReplyDTO, ErrorMsg } from "Shared"

export class FindEventsByPlaceUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: PlaceUsecaseParams): Promise<FindEventsByPlaceReplyDTO> {
		try {
			const { place } = input

			return await this.services.events.findManyByPlace(place)
		} catch (error) {
			return new FindEventsByPlaceReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
