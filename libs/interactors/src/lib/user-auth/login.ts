import { DatabaseServices } from "Infra-backend"
import { LoginReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { LoginParams } from "libs/domain/src/lib/params/auth"

export class LoginUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: LoginParams): Promise<LoginReplyDTO> {
		return await this.service.userAuth.login(input)
	}
}
