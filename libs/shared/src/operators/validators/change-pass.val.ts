import validator from "validator"
import { ErrorMsg } from "../../utils"

// CHANGE PASS
export class ChangePassValidator {
	validate(actual: string, newPass: string, confirm: string): void {
		// Comparaison
		if (newPass !== confirm)
			throw new ErrorMsg(400, "new and confirmation emails must be the same")
		if (newPass === actual) throw new ErrorMsg(400, "new and old emails must be different")

		// Conformity
		const validPass = validator.isStrongPassword(newPass)
		if (validPass) throw new ErrorMsg(400, "weak Password")
		else return
	}
}
