import { ChangeEmailReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ChangeEmailParams } from "Shared"
import { ErrorMsg, validators } from "Shared"

export class ChangeEmailUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ChangeEmailParams): Promise<ChangeEmailReplyDTO> {
		try {
			// Operators
			const { actual, confirm, newEmail, id } = inputs
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
