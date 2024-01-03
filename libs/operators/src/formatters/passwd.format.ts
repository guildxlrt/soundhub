import * as bcrypt from "bcrypt"

export const passwdFormat = async (password: string) => {
	const saltRounds = 10
	const hash = await bcrypt.hash(password, saltRounds)

	return hash
}
