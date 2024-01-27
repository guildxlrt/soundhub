import { UserAuthsFrontendRepos } from "Domain"
import {
	ChangeEmailReqDTO,
	ChangePassReqDTO,
	ErrorMsg,
	ILoginSucc,
	LoginReqDTO,
	UserEmail,
	UserPassword,
	apiUrlEndpt,
	apiUrlPath,
	apiUrlRoot,
} from "Shared"
import { Response } from "../../assets"
import axios from "axios"

export class UserAuthsImplement implements UserAuthsFrontendRepos {
	async login(input: { email: string; password: string }): Promise<Response<ILoginSucc>> {
		try {
			const { email, password } = input
			return (await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.login}`,
				withCredentials: true,
				data: { email: email, password: password } as LoginReqDTO,
			})) as Response<ILoginSucc>
		} catch (error) {
			return new Response<ILoginSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async logout(): Promise<Response<void>> {
		try {
			return (await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.logout}`,
				withCredentials: true,
			})) as Response<void>
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg("Error Calling API"))
		}
	}

	async changeEmail(input: {
		actual: UserEmail
		newEmail: UserEmail
		confirm: UserEmail
	}): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.changeEmail}`,
				withCredentials: true,
				data: input as ChangeEmailReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg("Error Calling API"))
		}
	}

	async changePass(input: {
		actual: UserPassword
		newPass: UserPassword
		confirm: UserPassword
	}): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.changePass}`,
				withCredentials: true,
				data: input as ChangePassReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg("Error Calling API"))
		}
	}
}
