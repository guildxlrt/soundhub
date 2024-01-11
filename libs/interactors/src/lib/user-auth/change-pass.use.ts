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

	async execute(inputs: {
		data: ChangePassReqDTO
		id: number
		hashedPass?: string
	}): Promise<ChangePassReplyDTO> {
		try {
			const { actual, confirm, newPass } = inputs.data
			const { hashedPass, id } = inputs

			// Operators
			validators.changePass(actual, confirm, newPass)

			// return
			return await this.services.userAuths.changePass(
				new ChangePassParams(actual, confirm, newPass, id, hashedPass)
			)
		} catch (error) {
			return new ChangePassReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
