import { DatabaseServices } from "Infra-backend"
import { ChangePassInputDTO, ChangePassReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"

export class ChangePassUsecase extends BaseUsecase<ChangePassInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: ChangePassInputDTO): Promise<ChangePassReplyDTO> {
		return await this.service.userAuth.changePass(input)
	}
}
