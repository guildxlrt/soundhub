import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByPlaceReplyDTO } from "Dto"
import { PlaceParams } from "Domain"

export class FindEventsByPlaceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: PlaceParams): Promise<FindEventsByPlaceReplyDTO> {
		return await this.services.events.findManyByPlace(inputs)
	}
}
