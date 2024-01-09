import {
	ChangeEmailParams,
	ChangePassParams,
	ErrorMsg,
	LoginParams,
	UserAuthsRepository,
	apiErrorMsg,
	encryptors,
} from "Shared"
import { Reply, dbClient } from "../../assets"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Reply<Credential>> {
		const { email, password } = inputs

		try {
			const data = await dbClient.userAuth.findUnique({
				where: {
					email: email,
				},
				select: {
					email: true,
					password: true,
				},
			})

			const encrypted = data?.password as string
			const compare = await encryptors.comparePass(password, encrypted)

			if (compare) return new Reply<Credential>(new Credential())
			else throw new ErrorMsg(401, apiErrorMsg.e401)
		} catch (error) {
			return new Reply<Credential>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async logout(): Promise<Reply<void>> {
		// Calling DB
		// ... some logic

		// Return Response
		const res: any = new Reply({})

		return res
	}

	async changeEmail(inputs: ChangeEmailParams): Promise<Reply<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply({})

		return res
	}

	async changePass(inputs: ChangePassParams): Promise<Reply<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply({})

		return res
	}
}
