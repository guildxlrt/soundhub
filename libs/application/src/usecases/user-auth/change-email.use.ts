import { ErrorHandler, envs, htmlError } from "Shared"
import { ChangeEmailUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorMsg } from "Shared"
import { UserAuthService } from "../../services"
import { UserAuth } from "Domain"

export class ChangeEmailUsecase {
	private mainService: UserAuthService

	constructor(mainService: UserAuthService) {
		this.mainService = mainService
	}

	async execute(input: ChangeEmailUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: ChangeEmailUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { actual, confirm, newOne } = input
			const data = await this.mainService.changeEmail({
				actual: actual,
				newOne: newOne,
				confirm: confirm,
			})
			return new UsecaseReply<boolean>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: ChangeEmailUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id, newOne, actual, confirm } = input

			UserAuth.validateNewEmail(actual, newOne, confirm)

			// AUTHENTIFICATE
			const authDb = await this.mainService.getByID(id as number)
			const compareIDs = authDb.id === (id as number)
			const mustBeSimilar = actual === authDb.email
			const mustBeDifferent = newOne === authDb.email

			if (!compareIDs || !mustBeSimilar || !mustBeDifferent)
				throw ErrorMsg.htmlError(htmlError[403])

			// SAVE
			const data = await this.mainService.changePass({
				id: id as number,
				pass: newOne,
			})

			return new UsecaseReply<boolean>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
