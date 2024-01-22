import validator from "validator"
import { ErrorMsg } from "../../utils"

// CHANGE EMAIL
export class ChangeEmailValidator {
	validate(actual: string, newEmail: string, confirm: string): void {
		// Comparaison
		if (newEmail !== confirm)
			throw new ErrorMsg(400, "new and confirmation emails must be the same")
		if (newEmail === actual) throw new ErrorMsg(400, "new and old emails must be different")

		// Conformity
		const validEmail = validator.isEmail(newEmail)
		if (!validEmail) throw new ErrorMsg(400, "invalid email format")
		else return
	}
}
