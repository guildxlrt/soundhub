import { ErrorMsg, ReplyLayer, ILoginRes } from "Shared"
import { UsecaseLayer, ServicesType, LoginUsecaseParams } from "../../../assets"

export class LoginUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: LoginUsecaseParams): Promise<ReplyLayer<ILoginRes>> {
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
