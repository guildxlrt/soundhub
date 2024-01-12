import {
	ChangeEmailParams,
	ChangePassParams,
	ErrorMsg,
	LoginParams,
	UserAuthsRepository,
	apiErrorMsg,
	ILoginRes,
	ILoginResServer,
} from "Shared"
import { Reply, dbClient } from "../../assets"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Reply<ILoginRes>> {
		try {
			const { email, password } = inputs

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

			const encryptedPass = data?.password as string
			const userId = data?.id as number

			return new Reply<ILoginResServer>({
				email: email,
				password: password,
				encryptedPass: encryptedPass,
				id: userId,
			})
		} catch (error) {
			return new Reply<ILoginResServer>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async logout(): Promise<Reply<void>> {
		try {
			return new Reply<void>()
		} catch (error) {
			return new Reply<void>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async changeEmail(inputs: ChangeEmailParams): Promise<Reply<boolean>> {
		try {
			const { newEmail, id } = inputs

			// Persist data
			await dbClient.userAuth.update({
				where: {
					id: id,
				},
				data: {
					email: newEmail,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async changePass(inputs: ChangePassParams): Promise<Reply<boolean>> {
		try {
			const { newPass, id } = inputs

			// Persist data
			await dbClient.userAuth.update({
				where: {
					id: id,
				},
				data: {
					password: newPass,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
