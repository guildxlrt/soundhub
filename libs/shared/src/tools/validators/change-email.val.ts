import validators from "validator"
import { ErrorMsg } from "../../assets"

// CHANGE EMAIL
export class ChangeEmailValidator {
	validate(
		emails: { actual: string; newEmail: string; confirm: string },
		backend: boolean
	): void {
		try {
			const { newEmail, actual, confirm } = emails

			// Comparaison
			if (newEmail !== confirm)
				throw new ErrorMsg("new and confirmation emails must be the same", 400)
			if (newEmail === actual) throw new ErrorMsg("new and old emails must be different", 400)

			// Conformity
			const validEmail = validators.isEmail(newEmail)
			if (!validEmail) throw new ErrorMsg("invalid email format", 400)
			else return
		} catch (error) {
			throw new ErrorMsg("error during Genres format", backend ? 500 : undefined).treatError(
				error
			)
		}
	}
}