import { ErrorMsg } from "Shared-utils"
import * as bcrypt from "bcrypt"

export const passwdFormat = async (password: string) => {
	try {
		const saltRounds = 10
		const hash = await bcrypt.hash(password, saltRounds)

		return hash
	} catch (error) {
		throw new ErrorMsg(500, "error during hashing pass", error)
	}
}
