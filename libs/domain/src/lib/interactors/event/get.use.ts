import { GetEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"

export class GetEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetEventReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.events.get(id)
		} catch (error) {
			return new GetEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
