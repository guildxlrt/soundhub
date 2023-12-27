import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { ModifyReleasePriceInputDTO, ModifyReleasePriceReplyDTO } from "Dto"

export class ModifyReleasePriceUsecase extends BaseUsecase<ModifyReleasePriceInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(price: ModifyReleasePriceInputDTO): Promise<ModifyReleasePriceReplyDTO> {
		return await this.service.release.modifyPrice(price)
	}
}
