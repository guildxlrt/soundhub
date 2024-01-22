import validator from "validator"
import { ErrorMsg } from "../../utils"

// NEW AUTHS
export class SignupAuthsValidator {
	validate(email: string, password: string, confirmEmail: string, confirmPass: string): void {
		// Email
		const validEmail = validator.isEmail(email)
		if (!validEmail) throw new ErrorMsg(400, "invalid email format")
		if (email !== confirmEmail) throw new ErrorMsg(400, "emails don't match")

		// Password
		const validPass = validator.isStrongPassword(password)
		if (!validPass) throw new ErrorMsg(400, "weak Password")
		if (password !== confirmPass) throw new ErrorMsg(400, "passwords don't match")
		else return
	}
}
