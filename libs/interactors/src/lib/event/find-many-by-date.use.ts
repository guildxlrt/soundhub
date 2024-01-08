import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByDateReqDTO, FindEventsByDateReplyDTO, ErrorMsg } from "Shared"
import { DateParams } from "Shared"

export class FindEventsByDateUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: FindEventsByDateReqDTO): Promise<FindEventsByDateReplyDTO> {
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
