import { DatabaseServices } from "Infra-backend"
import { LoginDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class LoginUsecase extends BaseUsecase<LoginDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(params: LoginDTO): Promise<LoginDTO> {
		return await this.service.userAuth.login(params)
	}
}
