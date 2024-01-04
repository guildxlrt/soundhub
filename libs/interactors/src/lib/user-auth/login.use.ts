import { DatabaseServices } from "Infra-backend"
import { LoginReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { LoginParams } from "Domain"

export class LoginUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: LoginParams): Promise<LoginReplyDTO> {
		return await this.services.userAuths.login(inputs)
	}
}
