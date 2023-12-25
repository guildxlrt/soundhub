import { InputLayer } from "../../../assets"

export abstract class UserAuthRepository {
	abstract login(inputs: InputLayer<unknown>): Promise<InputLayer<Credential>>

	abstract logout(inputs: InputLayer<unknown>): Promise<InputLayer<unknown>>

	abstract changeEmail(inputs: InputLayer<unknown>): Promise<InputLayer<boolean>>

	abstract changePass(inputs: InputLayer<unknown>): Promise<InputLayer<boolean>>
}
