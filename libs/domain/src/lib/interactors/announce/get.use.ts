import { GetAnnounceReplyDTO, ErrorMsg, AnnounceID } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"

export class GetAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: AnnounceID): Promise<GetAnnounceReplyDTO> {
		try {
			return await this.services.announces.get(id)
		} catch (error) {
			return new GetAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
