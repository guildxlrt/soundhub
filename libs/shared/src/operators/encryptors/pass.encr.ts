import { ErrorMsg } from "../../utils"
import * as bcrypt from "bcrypt"

export class PassEncryptor {
	async hash(password: string): Promise<string> {
		try {
			const saltRounds = 10
			const hash = await bcrypt.hash(password, saltRounds)

			return hash
		} catch (error) {
			throw new ErrorMsg(500, "error during hashing pass", error)
		}
	}
	async compare(password: string, encrypted: string): Promise<boolean> {
		try {
			return await bcrypt.compare(password, encrypted)
		} catch (error) {
			throw new ErrorMsg(500, "error during decode pass", error)
		}
	}
}

export const passEncryptor = new PassEncryptor()
