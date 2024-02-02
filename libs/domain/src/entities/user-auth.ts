import { CredentialsValidator, ErrorHandler, UserEmail, UserPassword } from "Shared"
import { EntityLayer } from "./layers"
import { PasswordServicePort, ValidationServicePort } from "../ports"

export class UserAuth extends EntityLayer {
	email: UserEmail | null
	password: UserPassword | null
	private validator: CredentialsValidator = new CredentialsValidator()

	constructor(id: number | null, email: string | null, password: string | null) {
		super(id)

		this.email = email
		this.password = password
	}

	async hashPass(service: PasswordServicePort): Promise<string> {
		try {
			return await service.hash(this.password as string)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async validateNewAuths(service: ValidationServicePort): Promise<boolean> {
		try {
			return await this.validator.signUp(service, this.email, this.password)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	static validateNewEmail(actual: string, newEmail: string, confirmEmail: string) {
		return CredentialsValidator.update(actual, newEmail, confirmEmail, "email")
	}

	static validateNewPass(actual: string, newPass: string, confirmPass: string) {
		return CredentialsValidator.update(actual, newPass, confirmPass, "password")
	}
}
