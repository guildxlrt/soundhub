import { DatabaseServices } from "Infra-backend"
import { ChangeEmailDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class ChangeEmailUsecase extends BaseUsecase<ChangeEmailDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(params: ChangeEmailDTO): Promise<ChangeEmailDTO> {
		return await this.service.userAuth.changeEmail(params)
	}
}
