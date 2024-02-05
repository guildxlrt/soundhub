import { ErrorHandler } from "Shared"
import { UserAuthService } from "../../services"
import { UsecaseReply } from "../../utils"

export class LogoutUsecase {
	private mainService: UserAuthService

	constructor(mainService: UserAuthService) {
		this.mainService = mainService
	}

	async execute(): Promise<UsecaseReply<boolean>> {
		try {
			const res = await this.mainService.logout()
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
