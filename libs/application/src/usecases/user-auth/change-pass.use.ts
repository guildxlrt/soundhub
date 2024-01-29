import { ChangePassReplyDTO, ErrorHandler, envs, htmlError } from "Shared"
import { ChangePassUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { UserAuthService } from "../../services"

export class ChangePassUsecase {
	private userAuthService: UserAuthService

	constructor(userAuthService: UserAuthService) {
		this.userAuthService = userAuthService
	}

	async execute(input: ChangePassUsecaseParams): Promise<ChangePassReplyDTO> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: ChangePassUsecaseParams): Promise<ChangePassReplyDTO> {
		try {
			const { actual, confirm, newPass } = input

			const data = await this.userAuthService.changePass({
				actual: actual,
				newPass: newPass,
				confirm: confirm,
			})
			return new ChangePassReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async backend(input: ChangePassUsecaseParams): Promise<ChangePassReplyDTO> {
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

			return new ChangePassReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
