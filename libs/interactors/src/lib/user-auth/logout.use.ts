import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { LogoutReplyDTO } from "Dto"

export class LogoutUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<LogoutReplyDTO> {
		return await this.services.userAuths.logout()
	}
}
