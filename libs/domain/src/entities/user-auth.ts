import { ErrorHandler, UserEmail, UserPassword } from "Shared"
import { EntityLayer } from "./layers"
import { PasswordServicePort, ValidationServicePort } from "../ports"
import { CredentialsValidator } from "../tools"

export class UserAuth extends EntityLayer {
	email: UserEmail | null
	password: UserPassword | null
	private validator: CredentialsValidator = new CredentialsValidator()

	constructor(id: number | null, email: string | null, password: string | null) {
		super(id)

		this.email = email
		this.password = password
	}

	async hashPass(service: PasswordServicePort): Promise<void> {
		try {
			this.password = await service.hash(this.password as string)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async validateNewAuths(
		service: ValidationServicePort,
		confirmEmail: string,
		confirmPass: string
	): Promise<boolean> {
		try {
			return await this.validator.signUp(
				service,
				this.email as string,
				confirmEmail,
				this.password as string,
				confirmPass
			)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	static validateNewEmail(actual: string, newEmail: string, confirmEmail: string) {
		return CredentialsValidator.update(actual, newEmail, confirmEmail, "email")
	}

	static validateNewPass(actual: string, newPass: string, confirmPass: string) {
		return CredentialsValidator.update(actual, newPass, confirmPass, "password")
	}
}
