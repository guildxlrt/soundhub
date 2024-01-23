import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetAllEventsReplyDTO, ErrorMsg } from "Shared"

export class GetAllEventsUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		try {
			return await this.services.events.getAll()
		} catch (error) {
			return new GetAllEventsReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
