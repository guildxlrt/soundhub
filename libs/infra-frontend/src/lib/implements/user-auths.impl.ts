import { UserAuthsRepository } from "Domain"
import {
	ChangeEmailReqDTO,
	ChangePassReqDTO,
	ErrorMsg,
	ILoginRes,
	LoginReqDTO,
	apiUrlEndpt,
	apiUrlPath,
	apiUrlRoot,
} from "Shared"
import { Response } from "../../assets"
import axios from "axios"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(email: string, password: string): Promise<Response<ILoginRes>> {
		try {
			return (await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.login}`,
				withCredentials: true,
				data: { email: email, password: password } as LoginReqDTO,
			})) as Response<ILoginRes>
		} catch (error) {
			return new Response<ILoginRes>(undefined, new ErrorMsg("Error Calling API"))
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

	async changeEmail(data: { actual: string; newEmail: string }): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.changeEmail}`,
				withCredentials: true,
				data: data as ChangeEmailReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg("Error Calling API"))
		}
	}

	async changePass(data: { actual: string; newPass: string }): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.announces + apiUrlEndpt.auth.changePass}`,
				withCredentials: true,
				data: data as ChangePassReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg("Error Calling API"))
		}
	}
}
