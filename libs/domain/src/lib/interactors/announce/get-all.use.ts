import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetAllAnnouncesReplyDTO, ErrorMsg } from "Shared"

export class GetAllAnnouncesUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		try {
			return await this.services.announces.getAll()
		} catch (error) {
			return new GetAllAnnouncesReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
