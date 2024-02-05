import { DatabaseServices } from "Infra-backend"
import { ChangeEmailInputDTO, ChangeEmailReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { validators } from "Operators"
import { ChangeEmailParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

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
