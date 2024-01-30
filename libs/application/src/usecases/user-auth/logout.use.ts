import { ErrorHandler } from "Shared"
import { UserAuthService } from "../../services"
import { Reply } from "../../assets"

export class LogoutUsecase {
	private userAuthService: UserAuthService

	constructor(userAuthService: UserAuthService) {
		this.userAuthService = userAuthService
	}

	async execute(): Promise<Reply<boolean>> {
		try {
			const res = await this.userAuthService.logout()
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
