import { ErrorMsg, ReplyLayer, ILoginRes } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { LoginAdapter } from "Shared"

export class LoginUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: LoginAdapter): Promise<ReplyLayer<ILoginRes>> {
		try {
			const { email, password } = inputs

			return await this.services.userAuths.login(email, password)
		} catch (error) {
			return new ReplyLayer<ILoginRes>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
