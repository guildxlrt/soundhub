import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByDateReplyDTO } from "Dto"

export class FindEventsByDateUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: Date): Promise<FindEventsByDateReplyDTO> {
		return await this.services.events.findManyByDate(inputs)
	}
}
