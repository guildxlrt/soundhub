import { ChangeEmailInputDTO, ChangePassInputDTO, LoginInputDTO } from "Dto"
import { IAuthController } from "../assets"
import { databaseServices } from "Infra-backend"
import { ChangeEmailUsecase, ChangePassUsecase, LoginUsecase, LogoutUsecase } from "Interactors"
import { validators } from "Operators"
import { errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { ctrlrErrHandler } from "../assets/error-handler"
import { ChangeEmailParams, ChangePassParams, LoginParams } from "Domain"

export class UserAuthController implements IAuthController {
	async login(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body as LoginInputDTO
			const { email, password } = inputs

			const login = new LoginUsecase(databaseServices)
			const { data, error } = await login.execute(new LoginParams(email, password))
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async logout(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const logout = new LogoutUsecase(databaseServices)
			const { data, error } = await logout.execute()
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async changeEmail(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body as ChangeEmailInputDTO

			// Operators
			const { actual, confirm, newEmail } = inputs
			validators.changeEmail(actual, confirm, newEmail)

			// Saving changes
			const changeEmail = new ChangeEmailUsecase(databaseServices)
			const { data, error } = await changeEmail.execute(
				new ChangeEmailParams(actual, confirm, newEmail)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async changePass(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body as ChangePassInputDTO

			// Operators
			const { actual, confirm, newPass } = inputs
			validators.changeEmail(actual, confirm, newPass)

			// Saving changes
			const changePass = new ChangePassUsecase(databaseServices)
			const { data, error } = await changePass.execute(
				new ChangePassParams(actual, confirm, newPass)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
