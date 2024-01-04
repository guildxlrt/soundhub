import { DatabaseServices } from "Infra-backend"
import { ChangePassReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { ChangePassParams } from "Domain"

export class ChangePassUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: ChangePassParams): Promise<ChangePassReplyDTO> {
		return await this.services.userAuths.changePass(inputs)
	}
}
