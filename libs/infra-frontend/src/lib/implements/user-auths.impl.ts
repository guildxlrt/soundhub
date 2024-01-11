import {
	ChangeEmailParams,
	ChangePassParams,
	ILoginRes,
	ILoginResClient,
	LoginParams,
	UserAuthsRepository,
} from "Shared"
import { Response } from "../../assets"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Response<ILoginRes>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Response<ILoginResClient>(0)

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
