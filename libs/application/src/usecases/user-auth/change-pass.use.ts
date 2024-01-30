import { ErrorHandler, envs, htmlError } from "Shared"
import { ChangePassParamsAdapter, Reply } from "../../assets"
import { ErrorMsg } from "Shared"
import { UserAuthService } from "../../services"

export class ChangePassUsecase {
	private userAuthService: UserAuthService

	constructor(userAuthService: UserAuthService) {
		this.userAuthService = userAuthService
	}

	async execute(input: ChangePassParamsAdapter): Promise<Reply<boolean>> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: ChangePassParamsAdapter): Promise<Reply<boolean>> {
		try {
			const { actual, confirm, newPass } = input

			const data = await this.userAuthService.changePass({
				actual: actual,
				newPass: newPass,
				confirm: confirm,
			})
			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async backend(input: ChangePassParamsAdapter): Promise<Reply<boolean>> {
		try {
			const { newPass, id } = input

			// AUTHENTIFICATION
			const auths = await this.userAuthService.getByID(id as number)
			const compareIDs = await this.userAuthService.compareIDs(auths.id, id as number)
			const comparePass = await this.userAuthService.comparePass(auths.email, auths.password)

			if (!compareIDs || !comparePass) throw ErrorMsg.htmlError(htmlError[403])

			// SAVE
			const hashed = await this.userAuthService.hashPass(newPass)

			const data = await this.userAuthService.changePass({
				id: id as number,
				pass: hashed,
			})

			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
