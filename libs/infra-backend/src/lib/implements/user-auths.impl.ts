import { UserAuthsRepository } from "Domain"
import {
	ChangeEmailParams,
	ChangePassParams,
	ErrorMsg,
	LoginParams,
	apiErrorMsg,
	ILoginRes,
	ILoginResServer,
	UserCookie,
	encryptors,
} from "Shared"
import { Reply, dbClient } from "../../assets"
import { getAuthID } from "../../assets/get-id"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Reply<ILoginRes>> {
		try {
			const { email, password } = inputs

			// find auth id
			const data = await dbClient.userAuth.findUnique({
				where: {
					email: email,
				},
				select: {
					email: true,
					password: true,
					id: true,
				},
			})

			if (!data?.id) throw new ErrorMsg(401, apiErrorMsg.e401)
			if (!data?.email || !data?.password) throw new ErrorMsg(500, apiErrorMsg.e500)

			// Find Profile Id
			const profile = await getAuthID(data?.id)

			const encryptedPass = data?.password as string

			// RESPONSE
			return new Reply<ILoginResServer>({
				email: email,
				password: password,
				encryptedPass: encryptedPass,
				userCookie: new UserCookie(data?.id as number, profile?.id as number, "artist"),
			})
		} catch (error) {
			return new Reply<ILoginResServer>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async logout(): Promise<Reply<void>> {
		try {
			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			return new Reply<void>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async changeEmail(inputs: ChangeEmailParams): Promise<Reply<boolean>> {
		try {
			const { actual, newEmail, id } = inputs

			// verify old
			const data = await dbClient.userAuth.findUnique({
				where: {
					id: id,
				},
				select: {
					email: true,
				},
			})

			if (data?.email !== actual) throw new ErrorMsg(403, apiErrorMsg.e403)

			// Persist data
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
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async changePass(inputs: ChangePassParams): Promise<Reply<boolean>> {
		try {
			const { actual, newPass, id } = inputs

			// verify old
			const data = await dbClient.userAuth.findUnique({
				where: {
					id: id,
				},
				select: {
					password: true,
				},
			})
			const encrypted = data?.password
			const hashedPass = await encryptors.comparePass(actual, encrypted as string)

			if (hashedPass !== true) throw new ErrorMsg(403, apiErrorMsg.e403)

			// Persist data
			await dbClient.userAuth.update({
				where: {
					id: id,
				},
				data: {
					password: newPass,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
