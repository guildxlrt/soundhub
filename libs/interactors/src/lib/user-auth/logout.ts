import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { LogoutReplyDTO } from "Dto"

export class LogoutUsecase extends BaseUsecase<LogoutReplyDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<LogoutReplyDTO> {
		return await this.service.userAuth.logout()
	}
}
