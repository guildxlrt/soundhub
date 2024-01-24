import { ChangePassReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType, ChangePassUsecaseParams } from "../../../assets"
import { ErrorMsg, validators } from "Shared"

export class ChangePassUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: ChangePassUsecaseParams): Promise<ChangePassReplyDTO> {
		try {
			const { actual, confirm, newPass, id } = inputs

			// Operators
			validators.changePass(
				{
					actual: actual,
					newPass: newPass,
					confirm: confirm,
				},
				this.backend
			)

			// return
			return await this.services.userAuths.changePass(
				{ actual: actual, newPass: newPass },
				id
			)
		} catch (error) {
			return new ChangePassReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
