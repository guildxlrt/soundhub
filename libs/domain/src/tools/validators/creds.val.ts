import { ValidationServicePort } from "Domain"
import { ErrorHandler, ErrorMsg, htmlError } from "Shared"

// CHANGE PASS
export class CredentialsValidator {
	static update(
		actual: string,
		newOne: string,
		confirm: string,
		label?: "email" | "password"
	): void {
		try {
			const value = label ? label : "credential"

			if (newOne !== confirm)
				throw new ErrorMsg(`${value}s don't match`, htmlError[422].value)
			if (newOne === actual)
				throw new ErrorMsg(`${value}s must be different`, htmlError[422].value)
			else return
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async signUp(
		service: ValidationServicePort,
		email: string,
		confirmEmail: string,
		password: string,
		confirmPass: string
	): Promise<boolean> {
		try {
			if (email !== confirmEmail)
				throw new ErrorMsg(`Email's don't match`, htmlError[422].value)
			if (password !== confirmPass)
				throw new ErrorMsg(`Passwords's don't match`, htmlError[422].value)

			const validPass = service.password(password as string)
			if (!validPass) throw new ErrorMsg("weak password", htmlError[422].value)

			const validEmail = service.email(email as string)
			if (!validEmail) throw new ErrorMsg("invalid email format", htmlError[422].value)
			else return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
