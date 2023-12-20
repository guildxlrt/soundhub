import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetUserPurchasesDTO } from "Dto"

export class GetUserPurchasesUsecase extends BaseUsecase<GetUserPurchasesDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetUserPurchasesDTO): Promise<GetUserPurchasesDTO> {
		return await this.service.release.getUserPurchases(inputs)
	}
}
