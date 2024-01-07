import { DatabaseServices } from "Infra-backend"
import { ChangeEmailInputDTO, ChangeEmailReplyDTO } from "Shared"
import { UsecaseLayer } from "../../assets"
import { ChangeEmailParams } from "Shared"
import { ErrorMsg, validators } from "Shared"

export class ChangeEmailUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: ChangeEmailInputDTO): Promise<ChangeEmailReplyDTO> {
		try {
			// Operators
			const { actual, confirm, newEmail } = inputs
			validators.changeEmail(actual, confirm, newEmail)

			return await this.services.userAuths.changeEmail(
				new ChangeEmailParams(actual, confirm, newEmail)
			)
		} catch (error) {
			return new ChangeEmailReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
