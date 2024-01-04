import { DatabaseServices } from "Infra-backend"
import { ChangeEmailReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { ChangeEmailParams } from "libs/domain/src/lib/params/auth"

export class ChangeEmailUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: ChangeEmailParams): Promise<ChangeEmailReplyDTO> {
		return await this.service.userAuth.changeEmail(input)
	}
}
