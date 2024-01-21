import { UsecaseLayer, ServicesType } from "../../../assets"
import { HideReleaseReplyDTO, ErrorMsg, HideReleaseAdapter } from "Shared"

export class HideReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: HideReleaseAdapter): Promise<HideReleaseReplyDTO> {
		try {
			const { id, isPublic, ownerID } = inputs

			return await this.services.releases.hide(id, isPublic, ownerID)
		} catch (error) {
			return new HideReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
