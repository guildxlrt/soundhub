import { DatabaseServices } from "Infra-backend"
import { LoginInputDTO, LoginReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { LoginParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

export class LoginUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: LoginInputDTO): Promise<LoginReplyDTO> {
		try {
			const { email, password } = inputs

			return await this.services.userAuths.login(new LoginParams(email, password))
		} catch (error) {
			return new LoginReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
