import { ChangeEmailParams, ChangePassParams, LoginParams, UserAuthsRepository } from "Shared"
import { Response } from "../../assets"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Response<Credential>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response({})

		return res
	}

	async logout(): Promise<Response<void>> {
		// Calling DB
		// ... some logic

		// Return Response
		const res: any = new Response({})

		return res
	}

	async changeEmail(inputs: ChangeEmailParams): Promise<Response<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response({})

		return res
	}

	async changePass(inputs: ChangePassParams): Promise<Response<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new Response({})

		return res
	}
}
