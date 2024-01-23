import { ErrorMsg, ReplyLayer, ILoginRes } from "Shared"
import { UsecaseLayer, ServicesType, LoginUsecaseParams } from "../../../assets"

export class LoginUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: LoginUsecaseParams): Promise<ReplyLayer<ILoginRes>> {
		try {
			const { email, password } = inputs

			return await this.services.userAuths.login(email, password)
		} catch (error) {
			return new ReplyLayer<ILoginRes>(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
