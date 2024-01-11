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
	noStatus,
} from "Shared"
import { Response, apiUrl } from "../../assets"
import axios from "axios"

const path = "/"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<Response<ILoginRes>> {
		try {
			return await axios({
				method: "post",
				url: `${apiUrl + path}login`,
				withCredentials: true,
				data: inputs as LoginReqDTO,
			})
		} catch (error) {
			return new Response<ILoginRes>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async logout(): Promise<Response<void>> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrl + path}logout`,
				withCredentials: true,
			})
		} catch (error) {
			return new Response<void>(undefined, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async changeEmail(inputs: ChangeEmailParams): Promise<Response<boolean>> {
		try {
			return await axios({
				method: "put",
				url: `${apiUrl + path}login`,
				withCredentials: true,
				data: inputs as ChangeEmailReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}

	async changePass(inputs: ChangePassParams): Promise<Response<boolean>> {
		try {
			return await axios({
				method: "put",
				url: `${apiUrl + path}/login`,
				withCredentials: true,
				data: inputs as ChangePassReqDTO,
			})
		} catch (error) {
			return new Response<boolean>(false, new ErrorMsg(noStatus, "Error Calling API"))
		}
	}
}
