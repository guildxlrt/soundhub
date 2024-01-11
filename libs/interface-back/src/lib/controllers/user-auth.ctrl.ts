import { IAuthController, Token, authExpires } from "../../assets"
import { databaseServices } from "Infra-backend"
import { ChangeEmailUsecase, ChangePassUsecase, LoginUsecase, LogoutUsecase } from "Interactors"
import {
	ChangeEmailReqDTO,
	ChangePassReqDTO,
	ErrorMsg,
	ILoginResServer,
	LoginReqDTO,
	ReplyDTO,
	UserAuthId,
	apiErrorMsg,
	encryptors,
} from "Shared"
import { errHandler, ApiRequest, ApiReply } from "../../assets"

export class UserAuthController implements IAuthController {
	async login(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs = req.body as LoginReqDTO

			const login = new LoginUsecase(databaseServices)
			const { data, error } = await login.execute(inputs)
			if (error) throw error

			const { encryptedPass, id } = data as ILoginResServer

			// Operations
			const { password } = inputs
			const compare = await encryptors.comparePass(password, encryptedPass as string)
			if (compare !== true) throw new ErrorMsg(401, apiErrorMsg.e401)

			// Return infos
			const expires = authExpires.oneYear
			const token = new Token().generate(id, expires)

			return res
				.cookie("jwt", token, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
				.status(202)
				.send(new ReplyDTO<UserAuthId>(id))
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async logout(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const logout = new LogoutUsecase(databaseServices)
			const { error } = await logout.execute()
			if (error) throw error

			// Return infos
			if (req.cookies.jwt)
				return res.clearCookie("jwt").status(202).json({ message: "Logout Success" })
			else return res.status(401).json(apiErrorMsg.e401)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async changeEmail(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs = req.body as ChangeEmailReqDTO
			const id = req.auth?.userId

			// Saving changes
			const changeEmail = new ChangeEmailUsecase(databaseServices)
			const { data, error } = await changeEmail.execute({ data: inputs, id: id as number })
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async changePass(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs = req.body as ChangePassReqDTO
			const id = req.auth?.userId as number

			// HashPass
			const { newPass } = inputs
			const hashedPass = await encryptors.hashPass(newPass)

			// Saving Changes
			const changePass = new ChangePassUsecase(databaseServices)
			const { data, error } = await changePass.execute({
				data: inputs,
				id: id,
				hashedPass: hashedPass,
			})
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}
}
