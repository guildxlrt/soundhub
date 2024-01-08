import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ChangePassReqDTO, ChangePassReplyDTO } from "Shared"
import { UsecaseLayer } from "../../assets"
import { ChangePassParams } from "Shared"
import { ErrorMsg, validators } from "Shared"

export class ChangePassUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ChangePassReqDTO): Promise<ChangePassReplyDTO> {
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
