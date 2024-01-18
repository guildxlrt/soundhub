import { UsecaseLayer, ServicesType } from "../../../assets"
import { FindEventsByPlaceReplyDTO, ErrorMsg } from "Shared"
import { PlaceParams } from "Shared"

export class FindEventsByPlaceUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: PlaceParams): Promise<FindEventsByPlaceReplyDTO> {
		try {
			return await this.services.events.findManyByPlace(inputs)
		} catch (error) {
			return new FindEventsByPlaceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
