import { ErrorMsg, ReplyLayer, ILoginRes } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { LoginParams } from "Shared"

export class LoginUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
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
