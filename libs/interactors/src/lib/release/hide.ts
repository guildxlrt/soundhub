import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { HideReleaseReplyDTO, ErrorMsg, HideReleaseParams } from "Shared"

export class HideReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: HideReleaseParams): Promise<HideReleaseReplyDTO> {
		try {
			const { id, isPublic, userAuth } = inputs

			return await this.services.releases.hide(new HideReleaseParams(id, isPublic, userAuth))
		} catch (error) {
			return new HideReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
