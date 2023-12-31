import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByDateInputDTO, FindEventsByDateReplyDTO } from "Dto"
import { DateParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

export class FindEventsByDateUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindEventsByDateInputDTO): Promise<FindEventsByDateReplyDTO> {
		try {
			return await this.services.events.findManyByDate(new DateParams(inputs.date))
		} catch (error) {
			return new FindEventsByDateReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
