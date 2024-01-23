import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"
import { GetReleaseReplyDTO, ErrorMsg } from "Shared"

export class GetReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {		super(services, backend)
	}

	async execute(inputs: IDUsecaseParams): Promise<GetReleaseReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.releases.get(id)
		} catch (error) {
			return new GetReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
