import { ErrorHandler, envs, htmlError } from "Shared"
import { ChangePassUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorMsg } from "Shared"
import { UserAuthService } from "../../services"
import { PasswordServicePort, UserAuth } from "Domain"

export class ChangePassUsecase {
	private mainService: UserAuthService
	private passwordService?: PasswordServicePort

	constructor(mainService: UserAuthService, passwordService?: PasswordServicePort) {
		this.mainService = mainService
		this.passwordService = passwordService
	}

	async execute(input: ChangePassUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend && this.passwordService)
				return await this.backend(input, this.passwordService)
			else if (envs.backend && !this.passwordService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: ChangePassUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { actual, confirm, newOne } = input

			const data = await this.mainService.changePass({
				actual: actual,
				newOne: newOne,
				confirm: confirm,
			})
			return new UsecaseReply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async backend(
		input: ChangePassUsecaseParams,
		passwordService: PasswordServicePort
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, actual, newOne, confirm } = input

			UserAuth.validateNewPass(actual, newOne, confirm)

			// AUTHENTIFICATION
			const auths = await this.mainService.getByID(id as number)
			const compareIDs = auths.id === (id as number)
			const areSimilar = await passwordService.areSimilar(actual, auths.password)
			const areDifferent = await passwordService.areDifferent(newOne, auths.password)

			if (!compareIDs || !areSimilar || !areDifferent)
				throw ErrorMsg.htmlError(htmlError[403])

			// SAVE
			const hashed = await passwordService.hash(newOne)

			const data = await this.mainService.changePass({
				id: id as number,
				pass: hashed,
			})

			return new UsecaseReply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
