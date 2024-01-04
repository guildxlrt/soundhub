import { DatabaseServices } from "Infra-backend"
import { ChangePassReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { ChangePassParams } from "libs/domain/src/lib/params/auth"

export class ChangePassUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: ChangePassParams): Promise<ChangePassReplyDTO> {
		return await this.service.userAuth.changePass(input)
	}
}
