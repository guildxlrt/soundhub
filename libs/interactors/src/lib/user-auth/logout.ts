import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { LogoutInputDTO, LogoutReplyDTO } from "Dto"

export class LogoutUsecase extends BaseUsecase<LogoutReplyDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: LogoutInputDTO): Promise<LogoutReplyDTO> {
		return await this.service.userAuth.logout(input)
	}
}
