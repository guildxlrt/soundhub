import { ApiErrHandler, UserAuthsImplement } from "Infra-backend"
import {
	ChangeEmailParamsAdapter,
	ChangeEmailUsecase,
	ChangePassParamsAdapter,
	ChangePassUsecase,
	LoginUsecase,
	LogoutUsecase,
	UserAuthService,
	AuthServices,
} from "Application"
import {
	ApiRes,
	ApiRequest,
	ChangeEmailReplyDTO,
	ChangeEmailDTO,
	ChangePassDTO,
	CreateArtistReplyDTO,
	ErrorMsg,
	LoginDTO,
	LogoutReplyDTO,
	htmlError,
} from "Shared"
import { IAuthCtrl } from "../assets"

export class UserAuthController implements IAuthCtrl {
	constructor() {}

	async login(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST")
				return res.status(405).send({ error: htmlError[405].message })

			const inputs = req.body as LoginDTO

			// // Operators
			// validators.changePass(
			// 	{
			// 		actual: actual,
			// 		newPass: newPass,
			// 		confirm: confirm,
			// 	},
			// 	envs.backend
			// )

			const userAuthService = new UserAuthService(new UserAuthsImplement())
			const login = new LoginUsecase(userAuthService)
			const { data, error } = await login.execute(inputs)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			const cookie = data?.userCookie
			if (!cookie?.name || !cookie?.val || !cookie?.options) {
				throw ErrorMsg.htmlError(htmlError[500])
			} else
				return res
					.cookie(cookie.name, cookie?.val, cookie?.options)
					.status(202)
					.send(new CreateArtistReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async logout(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "DELETE")
				return res.status(405).send({ error: htmlError[405].message })

			const userAuthService = new UserAuthService(new UserAuthsImplement())
			const logout = new LogoutUsecase(userAuthService)
			const { error } = await logout.execute()
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			if (req.cookies.jwt)
				return res.clearCookie("jwt").status(202).json(new LogoutReplyDTO())
			else return res.status(401).json(ErrorMsg.htmlError(htmlError[401]))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async changeEmail(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: htmlError[405].message })

			const { actual, confirm, newEmail } = req.body as ChangeEmailDTO
			const user = req.auth?.id

			// Saving changes
			const userAuthService = new UserAuthService(new UserAuthsImplement())
			const changeEmail = new ChangeEmailUsecase(userAuthService)
			const { data, error } = await changeEmail.execute(
				new ChangeEmailParamsAdapter(actual, confirm, newEmail, user)
			)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(202).send(new ChangeEmailReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async changePass(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: htmlError[405].message })

			const { actual, confirm, newPass } = req.body as ChangePassDTO
			const user = req.auth?.id

			// Saving Changes
			const userAuthService = new UserAuthService(new UserAuthsImplement())
			const authService = new AuthServices(new UserAuthsImplement())
			const changePass = new ChangePassUsecase(userAuthService, authService)

			const { data, error } = await changePass.execute(
				new ChangePassParamsAdapter(actual, confirm, newPass, user)
			)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(202).send(new ChangeEmailReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
