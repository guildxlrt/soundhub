import { LogoutReplyDTO, ErrorMsg } from "Shared"
import { UserAuthService } from "../../services"

export class LogoutUsecase {
	private userAuthService: UserAuthService

	constructor(userAuthService: UserAuthService) {
		this.userAuthService = userAuthService
	}

	async execute(): Promise<LogoutReplyDTO> {
		try {
			return await this.userAuthService.logout()
		} catch (error) {
			return new LogoutReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
