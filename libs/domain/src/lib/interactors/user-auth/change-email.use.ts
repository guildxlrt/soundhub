import { ChangeEmailReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ChangeEmailAdapter } from "Shared"
import { ErrorMsg, Validators } from "Shared"

export class ChangeEmailUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ChangeEmailAdapter): Promise<ChangeEmailReplyDTO> {
		try {
			const { actual, confirm, newEmail, id } = inputs

			// Operators
			Validators.changeEmail(actual, confirm, newEmail)

			// return
			return await this.services.userAuths.changeEmail(
				{ actual: actual, newEmail: newEmail },
				id
			)
		} catch (error) {
			return new ChangeEmailReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
