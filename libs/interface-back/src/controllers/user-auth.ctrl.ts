import {
	ApiErrHandler,
	ApiRequest,
	ApiRes,
	ArtistsImplement,
	UserAuthsImplement,
} from "Infra-backend"
import {
	ArtistsService,
	ChangeEmailParamsAdapter,
	ChangeEmailUsecase,
	ChangePassParamsAdapter,
	ChangePassUsecase,
	LoginParamsAdapter,
	LoginUsecase,
	LogoutUsecase,
	UserAuthService,
} from "Application"
import {
	ChangeEmailDTO,
	ChangePassDTO,
	ErrorMsg,
	LoginDTO,
	ReplyDTO,
	UserCookieName,
	htmlError,
} from "Shared"
import { IAuthCtrl } from "../assets"

export class UserAuthController implements IAuthCtrl {
	private userAuthsImplement = new UserAuthsImplement()
	private userAuthService = new UserAuthService(this.userAuthsImplement)
	private artistsImplement = new ArtistsImplement()
	private artistsService = new ArtistsService(this.artistsImplement)

	async login(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as LoginDTO
			const params = LoginParamsAdapter.fromDto(dto)

			// // Operators
			// validators.changePass(
			// 	{
			// 		actual: actual,
			// 		newPass: newPass,
			// 		confirm: confirm,
			// 	},
			// 	envs.backend
			// )

			const login = new LoginUsecase(this.userAuthService, this.artistsService)
			const { data, error } = await login.execute(params)

			if (error) throw error
			if (!data || typeof data === "boolean") throw ErrorMsg.htmlError(htmlError[500])

			const { name, val, options } = data.userCookie
			if (!name || !val || !options) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			const reponse = new ReplyDTO(data)
			return res.cookie(name, val, options).status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async logout(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const cookie: UserCookieName = "jwt"
			const token = req.cookies.jwt
			if (!token) return res.status(401).json(ErrorMsg.htmlError(htmlError[401]))

			const logout = new LogoutUsecase(this.userAuthService)
			const { error, data } = await logout.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.clearCookie(cookie).status(202).json(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async changeEmail(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as ChangeEmailDTO
			const user = req.auth?.id as number
			const params = ChangeEmailParamsAdapter.fromDto(dto, user)

			// // Operators
			// validators.changePass(
			// 	{
			// 		actual: actual,
			// 		newPass: newPass,
			// 		confirm: confirm,
			// 	},
			// 	envs.backend
			// )

			// Saving changes
			const changeEmail = new ChangeEmailUsecase(this.userAuthService)
			const { data, error } = await changeEmail.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async changePass(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as ChangePassDTO
			const user = req.auth?.id as number
			const params = ChangePassParamsAdapter.fromDto(dto, user)

			// // Operators
			// validators.changePass(
			// 	{
			// 		actual: actual,
			// 		newPass: newPass,
			// 		confirm: confirm,
			// 	},
			// 	envs.backend
			// )

			// Saving Changes
			const changePass = new ChangePassUsecase(this.userAuthService)
			const { data, error } = await changePass.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
