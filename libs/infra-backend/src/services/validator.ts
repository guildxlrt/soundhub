import { ValidationServicePort } from "Domain"
import { ErrorHandler } from "Shared"
import validators from "validator"

// NEW AUTHS
export class ValidatorService implements ValidationServicePort {
	email(email: string): boolean {
		try {
			return validators.isEmail(email)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	password(password: string): boolean {
		try {
			return validators.isStrongPassword(password, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
				returnScore: false,
				pointsPerUnique: 1,
				pointsPerRepeat: 0.5,
				pointsForContainingLower: 10,
				pointsForContainingUpper: 10,
				pointsForContainingNumber: 10,
				pointsForContainingSymbol: 10,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
