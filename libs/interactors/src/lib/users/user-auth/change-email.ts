import { DatabaseServices } from "Infra-backend"
import { ChangeEmailInputDTO, ChangeEmailReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class ChangeEmailUsecase extends BaseUsecase<ChangeEmailInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: ChangeEmailInputDTO): Promise<ChangeEmailReplyDTO> {
		return await this.service.userAuth.changeEmail(input)
	}
}
