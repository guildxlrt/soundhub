import { Reply } from "Shared-utils"
import { ChangeEmailParams, ChangePassParams, LoginParams } from "./params"

export abstract class UserAuthsRepository {
	abstract login(inputs: LoginParams): Promise<Reply<Credential>>

	abstract logout(): Promise<Reply<unknown>>

	abstract changeEmail(inputs: ChangeEmailParams): Promise<Reply<boolean>>

	abstract changePass(inputs: ChangePassParams): Promise<Reply<boolean>>
}
