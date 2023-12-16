import { InputsLayer } from "../../../assets"

export abstract class UserAuthRepository {
	abstract login(
		inputs: InputsLayer<unknown, Credential>
	): Promise<InputsLayer<unknown, Credential>>

	abstract logout(inputs: InputsLayer<unknown, unknown>): Promise<InputsLayer<unknown, unknown>>

	abstract changeEmail(
		inputs: InputsLayer<unknown, boolean>
	): Promise<InputsLayer<unknown, boolean>>

	abstract changePass(
		inputs: InputsLayer<unknown, boolean>
	): Promise<InputsLayer<unknown, boolean>>
}
