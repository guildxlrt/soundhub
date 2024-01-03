import { InputLayer, OutputLayer } from "../../assets"

export abstract class UserAuthRepository {
	abstract login(inputs: InputLayer<unknown>): Promise<OutputLayer<Credential>>

	abstract logout(): Promise<OutputLayer<unknown>>

	abstract changeEmail(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract changePass(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>
}
