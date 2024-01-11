import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { ModifyReleaseReqDTO, ModifyReleaseReplyDTO, ErrorMsg } from "Shared"
import { ModifyReleaseParams } from "Shared"

export class ModifyReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyReleaseReqDTO): Promise<ModifyReleaseReplyDTO> {
		try {
			const { id, newAmount } = inputs

			return await this.services.releases.modify(new ModifyReleaseParams(id, newAmount))
		} catch (error) {
			return new ModifyReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
