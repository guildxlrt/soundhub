import { DatabaseServices } from "Infra-backend"
import { GetEventInputDTO, GetEventReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

export class GetEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetEventInputDTO): Promise<GetEventReplyDTO> {
		try {
			return await this.services.events.get(new IdParams(inputs.id))
		} catch (error) {
			return new GetEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
