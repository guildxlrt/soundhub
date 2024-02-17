import { UserAuthsFrontendRepos } from "Domain"
import { ErrorHandler, UserEmail, UserPassword } from "Shared"
import axios from "axios"
import { apiUrlPath, apiUrlRoot } from "../../assets"

export class UserAuthsImplement implements UserAuthsFrontendRepos {
	async login(email: string, password: string): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.auth.login

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: { email: email, password: password },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async logout(): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.auth.logout

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async changeEmail(input: {
		actual: UserEmail
		newOne: UserEmail
		confirm: UserEmail
	}): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.auth.changeEmail

			return await axios({
				method: "put",
				url: url,
				withCredentials: true,
				data: input,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async changePass(input: {
		actual: UserPassword
		newOne: UserPassword
		confirm: UserPassword
	}): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.auth.changePass

			return await axios({
				method: "put",
				url: url,
				withCredentials: true,
				data: input,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
