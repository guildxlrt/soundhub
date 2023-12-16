import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { ModifyReleasePriceDTO } from "Dto"

export class ModifyReleasePriceUsecase extends BaseUsecase<ModifyReleasePriceDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(price: ModifyReleasePriceDTO): Promise<ModifyReleasePriceDTO> {
		return await this.service.release.modifyPrice(price)
	}
}
