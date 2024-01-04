import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByLocationReplyDTO } from "Dto"

export class FindEventsByLocationUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: string): Promise<FindEventsByLocationReplyDTO> {
		return await this.services.events.findManyByLocation(inputs)
	}
}
