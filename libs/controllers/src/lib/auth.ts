import { ChangeEmailInputDTO, ChangePassInputDTO, LoginInputDTO, LogoutInputDTO } from "Dto"
import { ApiRequest, ApiReply, apiError } from "../assets"
import { databaseServices } from "Infra-backend"
import { ChangeEmailUsecase, ChangePassUsecase, LoginUsecase, LogoutUsecase } from "Interactors"

export class AuthController {
	async login(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: LoginInputDTO = req.body as LoginInputDTO
			const login = new LoginUsecase(databaseServices)
			const { data, error } = await login.execute(inputs)

			// Operators
			// ... doing some heathcheck

			// Saving Profile
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

			// Operators
			// ... doing some heathcheck

			// Saving Profile
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
			const changeEmail = new ChangeEmailUsecase(databaseServices)
			const { data, error } = await changeEmail.execute(inputs)

			// Operators
			// ... doing some heathcheck

			// Saving Profile
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
			const changePass = new ChangePassUsecase(databaseServices)
			const { data, error } = await changePass.execute(inputs)

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}
}
