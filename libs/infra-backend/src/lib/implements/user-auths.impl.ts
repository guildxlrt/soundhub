import { UserAuthsRepository } from "Domain"
import { ErrorMsg, apiErrorMsg, ILoginRes, ILoginDbRes, UserAuthID, passEncryptor } from "Shared"
import { Reply, dbClient, getAuthID } from "../../assets"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(email: string): Promise<Reply<ILoginRes>> {
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

			if (!authData?.id) throw new ErrorMsg(404, apiErrorMsg.e404)
			if (!authData?.email || !authData?.password) throw new ErrorMsg(500, apiErrorMsg.e500)

			// Find Profile
			const profile = (await getAuthID(authData?.id)) as number

			// // RESPONSE
			const data = {
				encryptedPass: authData?.password as string,
				id: authData?.id as number,
				profileID: profile,
			}

			return new Reply<ILoginDbRes>(data)
		} catch (error) {
			return new Reply<ILoginDbRes>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
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

			if (getEmail?.email !== actual) throw new ErrorMsg(403, apiErrorMsg.e403)

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
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async changePass(
		data: { actual: string; newPass: string },
		id?: UserAuthID,
		hashedPass?: string
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

			const { actual } = data
			const encryptedPass = getPass?.password
			const auth = await passEncryptor.compare(actual, encryptedPass as string)

			if (auth !== true) throw new ErrorMsg(403, apiErrorMsg.e403)

			// PERSIST
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
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
