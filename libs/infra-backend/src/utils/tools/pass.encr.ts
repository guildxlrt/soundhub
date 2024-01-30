import { ErrorHandler, ErrorMsg, htmlError } from "Shared"
import * as bcrypt from "bcrypt"

export class PassEncryptor {
	static async hash(password: unknown): Promise<string> {
		try {
			if (typeof password !== "string") throw ErrorMsg.htmlError(htmlError[400])

			const saltRounds = 10
			const hash = await bcrypt.hash(password, saltRounds)

			return hash
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	static async compare(password: string, encrypted: string) {
		try {
			if (typeof password !== "string") throw ErrorMsg.htmlError(htmlError[400])
			if (typeof encrypted !== "string") throw ErrorMsg.htmlError(htmlError[500])

			return await bcrypt.compare(password, encrypted)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
