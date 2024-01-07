import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByPlaceInputDTO, FindEventsByPlaceReplyDTO, ErrorMsg } from "Shared"
import { PlaceParams } from "Shared"

export class FindEventsByPlaceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindEventsByPlaceInputDTO): Promise<FindEventsByPlaceReplyDTO> {
		try {
			return await this.services.events.findManyByPlace(new PlaceParams(inputs.place))
		} catch (error) {
			return new FindEventsByPlaceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
