import { PasswordServicePort } from "Domain"
import { ErrorHandler, ErrorMsg, htmlError } from "Shared"
import * as bcrypt from "bcrypt"

export class BcryptService implements PasswordServicePort {
	async hash(password: unknown): Promise<string> {
		try {
			if (typeof password !== "string") throw ErrorMsg.htmlError(htmlError[400])

			const saltRounds = 10
			const hash = await bcrypt.hash(password, saltRounds)

			return hash
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async areSimilar(password: string, encrypted: string): Promise<boolean> {
		try {
			if (typeof password !== "string") throw ErrorMsg.htmlError(htmlError[400])
			if (typeof encrypted !== "string") throw ErrorMsg.htmlError(htmlError[500])

			return await bcrypt.compare(password, encrypted)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async areDifferent(password: string, encrypted: string): Promise<boolean> {
		try {
			if (typeof password !== "string") throw ErrorMsg.htmlError(htmlError[400])
			if (typeof encrypted !== "string") throw ErrorMsg.htmlError(htmlError[500])

			const areDifferent = await bcrypt.compare(password, encrypted)
			if (!areDifferent) return false
			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
