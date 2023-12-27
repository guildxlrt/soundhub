import { ChangeEmailInputDTO, ChangePassInputDTO, LoginInputDTO, LogoutInputDTO } from "Dto"
import { ApiRequest, ApiReply, apiError, IAuthController } from "../assets"
import { databaseServices } from "Infra-backend"
import { ChangeEmailUsecase, ChangePassUsecase, LoginUsecase, LogoutUsecase } from "Interactors"
import { validators } from "Operators"

export class AuthController implements IAuthController {
	async login(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: LoginInputDTO = req.body as LoginInputDTO
			const login = new LoginUsecase(databaseServices)
			const { data, error } = await login.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async logout(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: LogoutInputDTO = req.body as LogoutInputDTO
			const logout = new LogoutUsecase(databaseServices)
			const { data, error } = await logout.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async changeEmail(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: ChangeEmailInputDTO = req.body as ChangeEmailInputDTO

			// Operators
			const { actual, confirm, newEmail } = inputs.data
			validators.changeEmail(actual, confirm, newEmail)

			// Saving changes
			const changeEmail = new ChangeEmailUsecase(databaseServices)
			const { data, error } = await changeEmail.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async changePass(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: ChangePassInputDTO = req.body as ChangePassInputDTO

			// Operators
			const { actual, confirm, newPass } = inputs.data
			validators.changeEmail(actual, confirm, newPass)

			// Saving changes
			const changePass = new ChangePassUsecase(databaseServices)
			const { data, error } = await changePass.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}
}
