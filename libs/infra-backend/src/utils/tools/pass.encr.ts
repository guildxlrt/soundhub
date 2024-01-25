import { ErrorMsg, apiError } from "Shared"
import * as bcrypt from "bcrypt"

export class PassEncryptor {
	static async hash(password: unknown): Promise<string> {
		try {
			if (typeof password !== "string") throw ErrorMsg.apiError(apiError[400])

			const saltRounds = 10
			const hash = await bcrypt.hash(password, saltRounds)

			return hash
		} catch (error) {
			throw new ErrorMsg("error during hashing pass", 500).treatError(error)
		}
	}
	static async compare(password: string, encrypted: string) {
		try {
			if (typeof password !== "string") throw ErrorMsg.apiError(apiError[400])
			if (typeof encrypted !== "string") throw ErrorMsg.apiError(apiError[500])

			return await bcrypt.compare(password, encrypted)
		} catch (error) {
			throw new ErrorMsg("error during pass verification", 500).treatError(error)
		}
	}
}
