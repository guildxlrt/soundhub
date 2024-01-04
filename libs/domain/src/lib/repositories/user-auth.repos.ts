import { OutputLayer } from "../../assets"
import { ChangeEmailParams, ChangePassParams, LoginParams } from "../params/user-auth"

export abstract class UserAuthRepository {
	abstract login(inputs: LoginParams): Promise<OutputLayer<Credential>>

	abstract logout(): Promise<OutputLayer<unknown>>

	abstract changeEmail(inputs: ChangeEmailParams): Promise<OutputLayer<boolean>>

	abstract changePass(inputs: ChangePassParams): Promise<OutputLayer<boolean>>
}
