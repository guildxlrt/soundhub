import { GetEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"

export class GetEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetEventReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.events.get(id)
		} catch (error) {
			return new GetEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
