import { DatabaseServices } from "Infra-backend"
import { LoginReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { LoginParams } from "Domain"

export class LoginUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: LoginParams): Promise<LoginReplyDTO> {
		return await this.services.userAuths.login(inputs)
	}
}
