import { UserAuthsBackendRepos, UserCookie } from "Domain"
import {
	ErrorMsg,
	UserAuthID,
	htmlError,
	UserTokenData,
	UserEmail,
	UserPassword,
	ProfileID,
	UserProfileType,
	ILoginSucc,
	ErrorHandler,
} from "Shared"
import { PassEncryptor, Token, authExpires } from "../utils"
import { dbClient } from "../database"

export class UserAuthsImplement implements UserAuthsBackendRepos {
	private userAuth = dbClient.userAuth

	async login(input: { data: unknown; userCookie: UserCookie }): Promise<ILoginSucc> {
		try {
			// return cookie
			return input
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async logout(): Promise<void> {
		try {
			return
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async changePass(input: { id: UserAuthID; pass: UserPassword }): Promise<boolean> {
		try {
			const { id, pass } = input

			// HASH PASS
			const hashedPass = await PassEncryptor.hash(pass)

			// PERSIST
			await this.userAuth.update({
				where: {
					id: id,
				},
				data: {
					password: hashedPass,
				},
			})

			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async changeEmail(input: { email: UserEmail; id: UserAuthID }): Promise<boolean> {
		try {
			const { id, email } = input

			await this.userAuth.update({
				where: {
					id: id,
				},
				data: {
					email: email,
				},
			})

			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async genCookie(
		id: UserAuthID,
		profile: ProfileID,
		profileType: UserProfileType
	): Promise<UserCookie> {
		try {
			if (!id || !profile) throw ErrorMsg.htmlError(htmlError[404])

			// token gen
			const expires = authExpires.oneYear
			const userCookie = new UserTokenData(id, profile, profileType)
			const token = await Token.generate(userCookie, expires)

			return new UserCookie("jwt", token as string, {
				maxAge: expires,
				httpOnly: true,
				sameSite: "lax",
				secure: false,
			})
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("error cannot generate cookie")
		}
	}

	async getByEmail(email: UserEmail): Promise<{
		id: number
		email: string
		password: string
	}> {
		try {
			const authData = await this.userAuth.findUniqueOrThrow({
				where: {
					email: email,
				},
				select: {
					email: true,
					password: true,
					id: true,
				},
			})

			if (!authData || !authData?.email || !authData?.email || !authData?.email)
				throw ErrorMsg.htmlError(htmlError[404])
			else return authData
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getByID(id: UserAuthID): Promise<{
		id: number
		email: string
		password: string
	}> {
		try {
			const authData = await this.userAuth.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					email: true,
					password: true,
					id: true,
				},
			})

			if (!authData || !authData?.email || !authData?.email || !authData?.email)
				throw ErrorMsg.htmlError(htmlError[404])
			else return authData
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async compareIDs(databaseID: UserAuthID, inputedID: UserAuthID): Promise<boolean> {
		if (databaseID !== inputedID) return false
		else return true
	}

	async comparePass(encryptedPass: UserPassword, inputedPass: UserPassword): Promise<boolean> {
		const auth = await PassEncryptor.compare(inputedPass, encryptedPass)

		if (auth !== true) return false
		else return true
	}

	async compareEmails(dbEmail: UserPassword, inputedEmail: UserPassword): Promise<boolean> {
		if (dbEmail !== inputedEmail) return false
		else return true
	}

	async hashPass(pass: string): Promise<string> {
		try {
			// HASH PASS
			return await PassEncryptor.hash(pass)
		} catch (error) {
			throw ErrorHandler.handle(error).setMessage("hash pass error")
		}
	}
}
