import { DatabaseServices } from "Infra-backend"
import { GetEventInputDTO, GetEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Shared"

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
