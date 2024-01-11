import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { HideReleaseReqDTO, HideReleaseReplyDTO, ErrorMsg, HideReleaseParams } from "Shared"

export class HideReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: HideReleaseReqDTO): Promise<HideReleaseReplyDTO> {
		try {
			const { id, isPublic } = inputs

			return await this.services.releases.hide(new HideReleaseParams(id, isPublic))
		} catch (error) {
			return new HideReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
