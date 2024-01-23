import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetAllReleasesReplyDTO, ErrorMsg } from "Shared"

export class GetAllReleasesUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(): Promise<GetAllReleasesReplyDTO> {
		try {
			return await this.services.releases.getAll()
		} catch (error) {
			return new GetAllReleasesReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
