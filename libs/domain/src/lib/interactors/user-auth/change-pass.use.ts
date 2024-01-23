import { ChangePassReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType, ChangePassUsecaseParams } from "../../../assets"
import { ErrorMsg, validators } from "Shared"

export class ChangePassUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ChangePassUsecaseParams): Promise<ChangePassReplyDTO> {
		try {
			const { actual, confirm, newPass, hashedPass, id } = inputs

			// Operators
			validators.changePass(actual, confirm, newPass)

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
