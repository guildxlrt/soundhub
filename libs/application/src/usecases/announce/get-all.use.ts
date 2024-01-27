import { UsecaseLayer, RepositoriesType } from "../../assets"
import { GetAllAnnouncesReplyDTO, ErrorMsg } from "Shared"

export class GetAllAnnouncesUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		try {
			return await this.services.announces.getAll()
		} catch (error) {
			return new GetAllAnnouncesReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
