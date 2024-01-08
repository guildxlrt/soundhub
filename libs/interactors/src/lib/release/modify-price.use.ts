import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { ModifyReleasePriceReqDTO, ModifyReleasePriceReplyDTO, ErrorMsg } from "Shared"
import { ReleasePriceParams } from "Shared"

export class ModifyReleasePriceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyReleasePriceReqDTO): Promise<ModifyReleasePriceReplyDTO> {
		try {
			const { id, newAmount } = inputs

			return await this.services.releases.modifyPrice(new ReleasePriceParams(id, newAmount))
		} catch (error) {
			return new ModifyReleasePriceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
