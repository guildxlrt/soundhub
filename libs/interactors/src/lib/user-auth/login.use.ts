import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ErrorMsg, ReplyLayer, ILoginRes } from "Shared"
import { UsecaseLayer } from "../../assets"
import { LoginParams } from "Shared"

export class LoginUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: LoginParams): Promise<ReplyLayer<ILoginRes>> {
		try {
			return await this.services.userAuths.login(inputs)
		} catch (error) {
			return new ReplyLayer<ILoginRes>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
