import {
	ChangeEmailParams,
	ChangeEmailReqDTO,
	ChangePassParams,
	ChangePassReqDTO,
	ErrorMsg,
	ILoginRes,
	LoginParams,
	LoginReqDTO,
	UserAuthsRepository,
	apiEndpts,
	apiPath,
	apiRoot,
} from "Shared"
import { Response } from "../../assets"
import axios from "axios"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Response<ILoginRes>> {
		try {
			return (await axios({
				method: "post",
				url: `${apiRoot + apiPath.announces + apiEndpts.auth.login}`,
				withCredentials: true,
				data: inputs as LoginReqDTO,
			})) as Response<ILoginRes>
		} catch (error) {
			return new Response<ILoginRes>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async logout(): Promise<Response<void>> {
		try {
			return (await axios({
				method: "delete",
				url: `${apiRoot + apiPath.announces + apiEndpts.auth.logout}`,
				withCredentials: true,
			})) as Response<void>
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async changeEmail(inputs: ChangeEmailParams): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "put",
				url: `${apiRoot + apiPath.announces + apiEndpts.auth.changeEmail}`,
				withCredentials: true,
				data: inputs as ChangeEmailReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg(undefined, "Error Calling API"))
		}
	}

	async changePass(inputs: ChangePassParams): Promise<Response<boolean>> {
		try {
			return (await axios({
				method: "put",
				url: `${apiRoot + apiPath.announces + apiEndpts.auth.changePass}`,
				withCredentials: true,
				data: inputs as ChangePassReqDTO,
			})) as Response<boolean>
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg(undefined, "Error Calling API"))
		}
	}
}
