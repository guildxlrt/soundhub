import { ApiErrHandler, IAuthCtrl, Token, authExpires } from "../../assets"
import { databaseServices } from "Infra-backend"
import { ChangeEmailUsecase, ChangePassUsecase, LoginUsecase, LogoutUsecase } from "Domain"
import {
	ChangeEmailAdapter,
	ChangeEmailReplyDTO,
	ChangeEmailReqDTO,
	ChangePassAdapter,
	ChangePassReqDTO,
	ErrorMsg,
	ILoginDbRes,
	LoginReplyDTO,
	LoginReqDTO,
	LogoutReplyDTO,
	UserCookie,
	UserProfileEnum,
	apiErrorMsg,
	PassEncryptor,
} from "Shared"
import { ApiRequest, ApiReply } from "../../assets"

export class UserAuthController implements IAuthCtrl {
	async login(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

			const inputs = req.body as LoginReqDTO

			const login = new LoginUsecase(databaseServices)
			const { data, error } = await login.execute(inputs)
			if (error) throw error

			const { encryptedPass, id, profileID } = data as ILoginDbRes

			// VERIFICATIONS
			// password
			const { password } = inputs
			const compare = await PassEncryptor.compare(password, encryptedPass as string)
			if (compare !== true) throw new ErrorMsg(401, apiErrorMsg.e401)

			// Return infos
			const expires = authExpires.oneYear
			const userCookie = new UserCookie(id, profileID, UserProfileEnum.artist)
			const token = Token.generate(userCookie, expires)

			return res
				.cookie("jwt", token, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
				.status(202)
				.send(new LoginReplyDTO(userCookie))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async logout(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })

			const logout = new LogoutUsecase(databaseServices)
			const { error } = await logout.execute()
			if (error) throw error

			// Return infos
			if (req.cookies.jwt)
				return res.clearCookie("jwt").status(202).json(new LogoutReplyDTO())
			else return res.status(401).json(apiErrorMsg.e401)
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async changeEmail(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

			const { actual, confirm, newEmail } = req.body as ChangeEmailReqDTO
			const user = req.auth?.id

			// Saving changes
			const changeEmail = new ChangeEmailUsecase(databaseServices)
			const { data, error } = await changeEmail.execute(
				new ChangeEmailAdapter(actual, confirm, newEmail, user)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new ChangeEmailReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async changePass(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

			const { actual, confirm, newPass } = req.body as ChangePassReqDTO
			const user = req.auth?.id

			// HashPass
			const hashedPass = await PassEncryptor.hash(newPass)

			// Saving Changes
			const changePass = new ChangePassUsecase(databaseServices)
			const { data, error } = await changePass.execute(
				new ChangePassAdapter(actual, confirm, newPass, user, hashedPass)
			)

			if (error) throw error

			// Return infos
			return res.status(202).send(new ChangeEmailReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
