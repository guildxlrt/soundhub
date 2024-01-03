import { ChangeEmailInputDTO, ChangePassInputDTO, LoginInputDTO } from "Dto"
import { IAuthController } from "../assets"
import { databaseServices } from "Infra-backend"
import { ChangeEmailUsecase, ChangePassUsecase, LoginUsecase, LogoutUsecase } from "Interactors"
import { validators } from "Operators"
import { ILogin, errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { ctrlrErrHandler } from "../assets/error-handler"

export class AuthController implements IAuthController {
	async login(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: LoginInputDTO = {
				data: {
					...(req.body as ILogin),
				},
			} as LoginInputDTO
			const login = new LoginUsecase(databaseServices)
			const { data, error } = await login.execute(inputs)
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
			const inputs: ChangeEmailInputDTO = req.body as ChangeEmailInputDTO

			// Operators
			const { actual, confirm, newEmail } = inputs.data
			validators.changeEmail(actual, confirm, newEmail)

			// Saving changes
			const changeEmail = new ChangeEmailUsecase(databaseServices)
			const { data, error } = await changeEmail.execute(inputs)
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
			const inputs: ChangePassInputDTO = req.body as ChangePassInputDTO

			// Operators
			const { actual, confirm, newPass } = inputs.data
			validators.changeEmail(actual, confirm, newPass)

			// Saving changes
			const changePass = new ChangePassUsecase(databaseServices)
			const { data, error } = await changePass.execute(inputs)
if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
