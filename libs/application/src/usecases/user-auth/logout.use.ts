import { LogoutReplyDTO, ErrorHandler } from "Shared"
import { UserAuthService } from "../../services"

export class LogoutUsecase {
	private userAuthService: UserAuthService

	constructor(userAuthService: UserAuthService) {
		this.userAuthService = userAuthService
	}

	async execute(): Promise<LogoutReplyDTO> {
		try {
			const res = await this.userAuthService.logout()
			return new LogoutReplyDTO(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
