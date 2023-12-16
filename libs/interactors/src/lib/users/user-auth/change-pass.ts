import { DatabaseServices } from "Infra-backend"
import { ChangePassDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class ChangePassUsecase extends BaseUsecase<ChangePassDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(params: ChangePassDTO): Promise<ChangePassDTO> {
		return await this.service.userAuth.changePass(params)
	}
}
