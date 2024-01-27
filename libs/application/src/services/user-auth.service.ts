import { UserAuthsRepository } from "Domain"
import { ErrorMsg, ILoginSucc, ReplyLayer, htmlError } from "Shared"

export class UserAuthService {
	readonly service: UserAuthsRepository

	constructor(service: UserAuthsRepository) {
		this.service = service
	}

	async login(input: unknown): Promise<ReplyLayer<ILoginSucc>> {
		try {
			return await this.service.login(input)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async logout(): Promise<ReplyLayer<void>> {
		try {
			return await this.service.logout()
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async changePass(input: unknown): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.changePass(input)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async changeEmail(input: unknown): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.changeEmail(input)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
