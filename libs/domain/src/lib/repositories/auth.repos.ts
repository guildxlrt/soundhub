import { InputLayer, OutputLayer } from "../../assets"

export abstract class UserAuthRepository {
	abstract login(inputs: InputLayer<unknown>): Promise<OutputLayer<Credential>>

	abstract logout(inputs: InputLayer<unknown>): Promise<OutputLayer<unknown>>

	abstract changeEmail(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract changePass(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>
}
