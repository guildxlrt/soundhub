import { UserAuthsFrontendRepos } from "Domain"
import { ErrorHandler, UserEmail, UserPassword } from "Shared"
import axios from "axios"
import { apiUrlPath, apiUrlRoot } from "../../assets"

export class UserAuthsImplement implements UserAuthsFrontendRepos {
	async login(email: string, password: string): Promise<boolean> {
		try {
			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.auth.login}`,
				withCredentials: true,
				data: { email: email, password: password },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async logout(): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.auth.logout}`,
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
			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.auth.changeEmail}`,
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
			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.auth.changePass}`,
				withCredentials: true,
				data: input,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
