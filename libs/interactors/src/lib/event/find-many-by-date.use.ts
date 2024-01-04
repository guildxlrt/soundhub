import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByDateReplyDTO } from "Dto"
import { DateParams } from "Domain"

export class FindEventsByDateUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: DateParams): Promise<FindEventsByDateReplyDTO> {
		return await this.services.events.findManyByDate(inputs)
	}
}
