import { DatabaseServices } from "Infra-backend"
import { ChangePassInputDTO, ChangePassReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { ChangePassParams } from "Domain"
import { validators } from "Operators"
import { ErrorMsg } from "Shared-utils"

export class ChangePassUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: ChangePassInputDTO): Promise<ChangePassReplyDTO> {
		try {
			// Operators
			const { actual, confirm, newPass } = inputs
			validators.changeEmail(actual, confirm, newPass)

			return await this.services.userAuths.changePass(
				new ChangePassParams(actual, confirm, newPass)
			)
		} catch (error) {
			return new ChangePassReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
