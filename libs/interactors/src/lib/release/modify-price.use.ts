import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { ModifyReleasePriceInputDTO, ModifyReleasePriceReplyDTO, ErrorMsg } from "Shared"
import { ReleasePriceParams } from "Shared"

export class ModifyReleasePriceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: ModifyReleasePriceInputDTO): Promise<ModifyReleasePriceReplyDTO> {
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
