import { UserAuthsFrontendRepos } from "Domain"
import { ErrorHandler, UserEmail, UserPassword, apiUrlEndpt, apiUrlPath, apiUrlRoot } from "Shared"
import axios from "axios"

export class UserAuthsImplement implements UserAuthsFrontendRepos {
	async login(email: string, password: string): Promise<boolean> {
		try {
			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.login}`,
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
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.logout}`,
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
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.changeEmail}`,
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
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.changePass}`,
				withCredentials: true,
				data: input,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
