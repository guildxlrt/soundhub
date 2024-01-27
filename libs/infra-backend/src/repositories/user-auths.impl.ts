import { AuthRepository, UserAuthsRepository } from "Domain"
import {
	ErrorMsg,
	UserAuthID,
	htmlError,
	UserTokenData,
	ILoginSucc,
	UserEmail,
	UserPassword,
	ArtistID,
} from "Shared"
import { PassEncryptor, Reply, Token, authExpires } from "../utils"
import { dbClient } from "../database"

export class UserAuthsImplement implements UserAuthsRepository, AuthRepository {
	async login(input: { id: UserAuthID; profile: ArtistID }): Promise<Reply<ILoginSucc>> {
		try {
			const { id, profile } = input
			if (!id || !profile) throw ErrorMsg.htmlError(htmlError[404])

			// token gen
			const expires = authExpires.oneYear
			const userCookie = new UserTokenData(id, profile, "artist")
			const token = await Token.generate(userCookie, expires)

			// return cookie
			return new Reply<ILoginSucc>(
				new ILoginSucc("jwt", token as string, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
			)
		} catch (error) {
			return new Reply<ILoginSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async logout(): Promise<Reply<void>> {
		try {
			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			return new Reply<void>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async changePass(input: { id: UserAuthID; pass: UserPassword }): Promise<Reply<boolean>> {
		try {
			const { id, pass } = input

			// PERSIST
			const hashedPass = await PassEncryptor.hash(pass)

			await dbClient.userAuth.update({
				where: {
					id: id,
				},
				data: {
					password: hashedPass,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async changeEmail(input: { email: UserEmail; id: UserAuthID }): Promise<Reply<boolean>> {
		try {
			const { id, email } = input

			await dbClient.userAuth.update({
				where: {
					id: id,
				},
				data: {
					email: email,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async getByEmail(email: UserEmail) {
		try {
			const authData = await dbClient.userAuth.findUnique({
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
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	async getByID(id: UserAuthID) {
		try {
			const authData = await dbClient.userAuth.findUnique({
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
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	async compareIDs(databaseID: UserAuthID, inputedID: UserAuthID): Promise<boolean> {
		if (databaseID !== inputedID) return false
		else return true
	}

	async comparePass(encryptedPass: UserPassword, inputedPass: UserPassword) {
		const auth = await PassEncryptor.compare(inputedPass, encryptedPass)

		if (auth !== true) return false
		else return true
	}

	async compareEmails(dbEmail: UserPassword, inputedEmail: UserPassword) {
		if (dbEmail !== inputedEmail) return false
		else return true
	}
}
