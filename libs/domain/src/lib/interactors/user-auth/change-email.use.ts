import { ChangeEmailReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType, ChangeEmailUsecaseParams } from "../../../assets"
import { ErrorMsg, validators } from "Shared"

export class ChangeEmailUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ChangeEmailUsecaseParams): Promise<ChangeEmailReplyDTO> {
		try {
			const { actual, confirm, newEmail, id } = inputs

			// Operators
			validators.changeEmail(actual, confirm, newEmail)

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
