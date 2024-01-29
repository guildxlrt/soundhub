import validators from "validator"
import { ErrorHandler, ErrorMsg } from "../../errors"

// NEW AUTHS
export class SignupAuthsValidator {
	validate(auths: {
		email: string
		password: string
		confirmEmail: string
		confirmPass: string
	}): void {
		try {
			const { email, password, confirmEmail, confirmPass } = auths

			// Email
			const validEmail = validators.isEmail(email)
			if (!validEmail) throw new ErrorMsg("invalid email format", 400)
			if (email !== confirmEmail) throw new ErrorMsg("emails don't match", 400)

			// Password
			const validPass = validators.isStrongPassword(password)
			if (!validPass) throw new ErrorMsg("weak Password", 400)
			if (password !== confirmPass) throw new ErrorMsg("passwords don't match", 400)
			else return
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
