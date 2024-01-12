import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { ModifyReleaseReplyDTO, ErrorMsg } from "Shared"
import { ModifyReleaseParams } from "Shared"

export class ModifyReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyReleaseParams): Promise<ModifyReleaseReplyDTO> {
		try {
			return await this.services.releases.modify(inputs)
		} catch (error) {
			return new ModifyReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
