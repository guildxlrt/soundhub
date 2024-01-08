import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByPlaceReqDTO, FindEventsByPlaceReplyDTO, ErrorMsg } from "Shared"
import { PlaceParams } from "Shared"

export class FindEventsByPlaceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: FindEventsByPlaceReqDTO): Promise<FindEventsByPlaceReplyDTO> {
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
