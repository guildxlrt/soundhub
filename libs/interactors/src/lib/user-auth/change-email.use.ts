import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ChangeEmailReqDTO, ChangeEmailReplyDTO, UserAuthId } from "Shared"
import { UsecaseLayer } from "../../assets"
import { ChangeEmailParams } from "Shared"
import { ErrorMsg, validators } from "Shared"

export class ChangeEmailUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: {
		data: ChangeEmailReqDTO
		id: UserAuthId
	}): Promise<ChangeEmailReplyDTO> {
		try {
			// Operators
			const id = inputs.id
			const { actual, confirm, newEmail } = inputs.data
			validators.changeEmail(actual, confirm, newEmail)

			return await this.services.userAuths.changeEmail(
				new ChangeEmailParams(actual, confirm, newEmail, id)
			)
		} catch (error) {
			return new ChangeEmailReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
