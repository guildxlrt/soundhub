import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { LogoutDTO } from "Dto"

export class LogoutUsecase extends BaseUsecase<LogoutDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: LogoutDTO): Promise<LogoutDTO> {
		return await this.service.userAuth.logout(inputs)
	}
}
