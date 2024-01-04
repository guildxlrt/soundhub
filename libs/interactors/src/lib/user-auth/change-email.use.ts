import { DatabaseServices } from "Infra-backend"
import { ChangeEmailReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { ChangeEmailParams } from "Domain"

export class ChangeEmailUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: ChangeEmailParams): Promise<ChangeEmailReplyDTO> {
		return await this.services.userAuths.changeEmail(inputs)
	}
}
