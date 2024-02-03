import { ValidationServicePort } from "Domain"
import { ErrorHandler, ErrorMsg } from "Shared"
import validators from "validator"

// NEW AUTHS
export class ValidatorService implements ValidationServicePort {
	email(email: string): boolean {
		try {
			const validEmail = validators.isEmail(email)
			if (!validEmail) throw new ErrorMsg("invalid email format", 400)
			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	password(password: string): boolean {
		try {
			const validPass = validators.isStrongPassword(password)
			if (!validPass) throw new ErrorMsg("weak Password", 400)
			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
