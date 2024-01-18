import { ChangePassReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ChangePassParams } from "Shared"
import { ErrorMsg, validators } from "Shared"

export class ChangePassUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ChangePassParams): Promise<ChangePassReplyDTO> {
		try {
			const { actual, confirm, newPass, hashedPass, id } = inputs

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
