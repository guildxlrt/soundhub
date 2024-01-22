import { ChangePassReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ChangePassAdapter } from "Shared"
import { ErrorMsg, Validators } from "Shared"

export class ChangePassUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ChangePassAdapter): Promise<ChangePassReplyDTO> {
		try {
			const { actual, confirm, newPass, hashedPass, id } = inputs

			// Operators
			Validators.changePass(actual, confirm, newPass)

			// return
			return await this.services.userAuths.changePass(
				{ actual: actual, newPass: newPass },
				id,
				hashedPass
			)
		} catch (error) {
			return new ChangePassReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
