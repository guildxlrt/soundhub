import { UserAuthsRepository } from "Domain"
import { ErrorMsg, UserAuthID, apiError, UserTokenData, Cookie } from "Shared"
import { PassEncryptor, Reply, Token, authExpires } from "../../utils"
import { GetID, dbClient } from "../../database"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(email: string, password: string): Promise<Reply<Cookie>> {
		try {
			// Find Auth
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

			if (!authData?.id) throw ErrorMsg.apiError(apiError[404])
			if (!authData?.email || !authData?.password) throw ErrorMsg.apiError(apiError[500])

			// password
			const encryptedPass = authData?.password
			const compare = await PassEncryptor.compare(password, encryptedPass)
			if (compare !== true) throw ErrorMsg.apiError(apiError[401])

			// RESPONSE
			const profile = await GetID.user(authData?.id as number, "profile")
			if (!profile) throw ErrorMsg.apiError(apiError[404])

			// token gen
			const expires = authExpires.oneYear
			const userCookie = new UserTokenData(authData.id, profile as number, "artist")
			const token = Token.generate(userCookie, expires)

			// return cookie
			return new Reply<Cookie>(
				new Cookie("jwt", token as string, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
			)
		} catch (error) {
			return new Reply<Cookie>(undefined, ErrorMsg.apiError(apiError[500]))
		}
	}

	async logout(): Promise<Reply<void>> {
		try {
			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			return new Reply<void>(undefined, ErrorMsg.apiError(apiError[500]))
		}
	}

	async changeEmail(
		data: { actual: string; newEmail: string },
		id?: UserAuthID
	): Promise<Reply<boolean>> {
		try {
			const { actual, newEmail } = data

			// AUTHENTIFICATION
			const getEmail = await dbClient.userAuth.findUnique({
				where: {
					id: id,
				},
				select: {
					email: true,
				},
			})

			if (getEmail?.email !== actual) throw ErrorMsg.apiError(apiError[403])

			// PERSIST
			await dbClient.userAuth.update({
				where: {
					id: id,
				},
				data: {
					email: newEmail,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.apiError(apiError[500]))
		}
	}

	async changePass(
		data: { actual: string; newPass: string },
		id?: UserAuthID
	): Promise<Reply<boolean>> {
		try {
			// AUTHENTIFICATION
			const getPass = await dbClient.userAuth.findUnique({
				where: {
					id: id,
				},
				select: {
					password: true,
				},
			})

			// compare
			const { actual } = data
			const encryptedPass = getPass?.password
			const auth = await PassEncryptor.compare(actual, encryptedPass as string)

			if (auth !== true) throw ErrorMsg.apiError(apiError[403])

			// PERSIST
			const hashedPass = await PassEncryptor.hash(actual)

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
			return new Reply<boolean>(false, ErrorMsg.apiError(apiError[500]))
		}
	}
}
