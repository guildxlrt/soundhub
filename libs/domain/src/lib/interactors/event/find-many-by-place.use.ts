import { UsecaseLayer, ServicesType, PlaceUsecaseParams } from "../../../assets"
import { FindEventsByPlaceReplyDTO, ErrorMsg } from "Shared"

export class FindEventsByPlaceUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {		super(services, backend)
	}

	async execute(inputs: PlaceUsecaseParams): Promise<FindEventsByPlaceReplyDTO> {
		try {
			const { place } = inputs

			return await this.services.events.findManyByPlace(place)
		} catch (error) {
			return new FindEventsByPlaceReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
