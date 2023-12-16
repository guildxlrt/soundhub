import { UserAuthRepository } from "Domain"
import { LoginDTO, LogoutDTO, ChangeEmailDTO, ChangePassDTO } from "Dto"

export class UserAuthImplement implements UserAuthRepository {
	async login(inputs: LoginDTO): Promise<LoginDTO> {
		const creds = new Credential()

		inputs.putInStorage(creds)

		return inputs
	}

	async logout(inputs: LogoutDTO): Promise<LogoutDTO> {
		inputs.putInStorage()

		return inputs
	}

	async changeEmail(inputs: ChangeEmailDTO): Promise<ChangeEmailDTO> {
		inputs.putInStorage(true)

		return inputs
	}

	async changePass(inputs: ChangePassDTO): Promise<ChangePassDTO> {
		inputs.putInStorage(true)

		return inputs
	}
}
