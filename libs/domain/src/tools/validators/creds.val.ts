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
		email: string | null,
		password: string | null
	): Promise<boolean> {
		try {
			const validPass = await service.password(password as string)
			if (validPass) throw new ErrorMsg("weak Password", htmlError[422].value)

			const validEmail = await service.email(email as string)
			if (!validEmail) throw new ErrorMsg("invalid email format", htmlError[422].value)
			else return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
