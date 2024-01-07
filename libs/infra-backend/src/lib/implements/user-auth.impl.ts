import { ChangeEmailParams, ChangePassParams, LoginParams, UserAuthsRepository } from "Domain"
import { Reply } from "../../assets"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Reply<Credential>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Reply({})

		return res
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
