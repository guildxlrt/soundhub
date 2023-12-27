import { DatabaseServices } from "Infra-backend"
import { LoginInputDTO, LoginReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"

export class LoginUsecase extends BaseUsecase<LoginInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: LoginInputDTO): Promise<LoginReplyDTO> {
		return await this.service.userAuth.login(input)
	}
}
