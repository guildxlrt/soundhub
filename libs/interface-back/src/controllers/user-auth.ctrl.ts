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
	private userAuthsImplement = new UserAuthsImplement()
	private userAuthService = new UserAuthService(this.userAuthsImplement)
	private artistsImplement = new ArtistsImplement()
	private artistsService = new ArtistsService(this.artistsImplement)
	private passwordService = new BcryptService()

	async login(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as LoginDTO
			const params = LoginUsecaseParams.fromDto(dto)

			const login = new LoginUsecase(
				this.userAuthService,
				this.passwordService,
				this.artistsService
			)
			const { data, error } = await login.execute(params)

			if (error) throw error
			if (!data || typeof data === "boolean") throw ErrorMsg.htmlError(htmlError[500])

			const cookie = new Cookie(data)
			const { name, val, options } = cookie
			if (!name || !val || !options) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			const reponse = new ResponseDTO(data)
			return res.cookie(name, val, options).status(202).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async logout(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const token = req.cookies.jwt
			if (!token) return res.status(401).json(ErrorMsg.htmlError(htmlError[401]))

			const logout = new LogoutUsecase(this.userAuthService)
			const { error, data } = await logout.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.clearCookie(cookieName).status(202).json(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async changeEmail(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as ChangeEmailDTO
			const user = req.auth?.id as number
			const params = ChangeEmailUsecaseParams.fromDto(dto, user)

			// Saving changes
			const changeEmail = new ChangeEmailUsecase(this.userAuthService)
			const { data, error } = await changeEmail.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async changePass(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as ChangePassDTO
			const user = req.auth?.id as number
			const params = ChangePassUsecaseParams.fromDto(dto, user)

			// Saving Changes
			const changePass = new ChangePassUsecase(this.userAuthService, this.passwordService)
			const { data, error } = await changePass.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}
}
