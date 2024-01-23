import { GetAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"

export class GetAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetAnnounceReplyDTO> {
		try {
			const id = inputs.id

			return await this.services.announces.get(id)
		} catch (error) {
			return new GetAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
