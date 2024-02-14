import { ArtistsImplement, BcryptService, UserAuthsImplement } from "Infra-backend"
import {
	ArtistsService,
	ChangeEmailUsecaseParams,
	ChangeEmailUsecase,
	ChangePassUsecaseParams,
	ChangePassUsecase,
	LoginUsecaseParams,
	LoginUsecase,
	LogoutUsecase,
	UserAuthService,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	ChangeEmailDTO,
	ChangePassDTO,
	ErrorMsg,
	LoginDTO,
	ResponseDTO,
	htmlError,
} from "Shared"
import { ApiErrorHandler, Cookie, IAuthCtrl, cookieName } from "../assets"

export class UserAuthController implements IAuthCtrl {
	async login(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as LoginDTO
			const params = LoginUsecaseParams.fromBackend(dto)

			// Services
			const userAuthsImplement = new UserAuthsImplement()
			const userAuthService = new UserAuthService(userAuthsImplement)
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)
			const passwordService = new BcryptService()

			// Calling database
			const login = new LoginUsecase(userAuthService, passwordService, artistsService)
			const { data, error } = await login.execute(params)

			if (error) throw error
			if (!data || typeof data === "boolean") throw ErrorMsg.htmlError(htmlError[500])

			const cookie = new Cookie(data)
			const { name, val, options } = cookie
			if (!name || !val || !options) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			const reponse = new ResponseDTO(data, error)
			return res.cookie(name, val, options).status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async logout(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const token = req.cookies.jwt
			if (!token) return res.status(401).json(ErrorMsg.htmlError(htmlError[401]))

			// Services
			const userAuthsImplement = new UserAuthsImplement()
			const userAuthService = new UserAuthService(userAuthsImplement)

			// Calling database
			const logout = new LogoutUsecase(userAuthService)
			const { error, data } = await logout.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.clearCookie(cookieName).status(200).json(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async changeEmail(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as ChangeEmailDTO
			const user = req.auth?.authID as number
			const params = ChangeEmailUsecaseParams.fromBackend(dto, user)

			// Services
			const userAuthsImplement = new UserAuthsImplement()
			const userAuthService = new UserAuthService(userAuthsImplement)

			// Calling database
			const changeEmail = new ChangeEmailUsecase(userAuthService)
			const { data, error } = await changeEmail.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async changePass(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as ChangePassDTO
			const user = req.auth?.authID as number
			const params = ChangePassUsecaseParams.fromBackend(dto, user)

			// Services
			const userAuthsImplement = new UserAuthsImplement()
			const userAuthService = new UserAuthService(userAuthsImplement)
			const passwordService = new BcryptService()

			// Calling database
			const changePass = new ChangePassUsecase(userAuthService, passwordService)
			const { data, error } = await changePass.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
