import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { ModifyReleasePriceReplyDTO } from "Dto"
import { ReleasePriceParams } from "Domain"

export class ModifyReleasePriceUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: ReleasePriceParams): Promise<ModifyReleasePriceReplyDTO> {
		return await this.services.releases.modifyPrice(inputs)
	}
}
