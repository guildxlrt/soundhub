import validators from "validator"
import { ErrorMsg } from "../../assets"

// CHANGE PASS
export class ChangePassValidator {
	validate(
		passwords: {
			actual: string
			newPass: string
			confirm: string
		},
		backend?: boolean
	): void {
		try {
			const { newPass, actual, confirm } = passwords

			// Comparaison
			if (newPass !== confirm)
				throw new ErrorMsg("new and confirmation emails must be the same", 400)
			if (newPass === actual) throw new ErrorMsg("new and old emails must be different", 400)

			// Conformity
			const validPass = validators.isStrongPassword(newPass)
			if (validPass) throw new ErrorMsg("weak Password")
			else return
		} catch (error) {
			throw new ErrorMsg("error during Genres format", backend ? 500 : undefined).treatError(
				error
			)
		}
	}
}
