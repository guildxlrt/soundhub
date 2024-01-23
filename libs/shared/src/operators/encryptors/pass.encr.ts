import { ErrorMsg } from "../../utils"
import * as bcrypt from "bcrypt"

export class PassEncryptor {
	static async hash(password: string): Promise<string> {
		try {
			const saltRounds = 10
			const hash = await bcrypt.hash(password, saltRounds)

			return hash
		} catch (error) {
			throw new ErrorMsg("error during hashing pass", 500)
		}
	}
	static async compare(password: string, encrypted: string) {
		try {
			return await bcrypt.compare(password, encrypted)
		} catch (error) {
			throw new ErrorMsg("error during Genres format", 500).treatError(error)
		}
	}
}
