import { ApiRequest, ApiReply, IArtistController } from "../assets"
import { errorMsg } from "Shared-utils"
import {
	CreateArtistInputDTO,
	FindArtistsByGenreInputDTO,
	GetArtistByEmailInputDTO,
	GetArtistByIdInputDTO,
	ModifyArtistInputDTO,
} from "Dto"
import {
	CreateArtistUsecase,
	FindArtistsByGenreUsecase,
	GetAllArtistsUsecase,
	GetArtistByEmailUsecase,
	GetArtistByIdUsecase,
	ModifyArtistUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { validators } from "Operators"

export class ArtistsController implements IArtistController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateArtistInputDTO = {
				data: req.body,
				file: null,
			} as CreateArtistInputDTO

			// SANITIZE
			const { email, password, confirmEmail, confirmPass } = inputs.data
			// auths
			validators.signupAuths(email, password, confirmEmail, confirmPass)
			// others data checking
			// ...

			// Saving Profile
			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			if (error.status) {
				return res.status(error.status).send(error.message)
			}
			return res.status(500).send(error)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: ModifyArtistInputDTO = {
				data: {
					...req.body,
				},
				file: null,
			} as ModifyArtistInputDTO

			// SANITIZE
			// ... doing some heathcheck

			// Saving Changes
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async getById(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetArtistByIdInputDTO = {
				data: Number(req.params.id),
			} as GetArtistByIdInputDTO
			const getArtistById = new GetArtistByIdUsecase(databaseServices)
			const { data, error } = await getArtistById.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async getByEmail(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetArtistByEmailInputDTO = {
				data: req.body.email,
			} as GetArtistByEmailInputDTO
			const getArtistByEmail = new GetArtistByEmailUsecase(databaseServices)
			const { data, error } = await getArtistByEmail.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const getAllArtists = new GetAllArtistsUsecase(databaseServices)
			const { data, error } = await getAllArtists.execute()

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindArtistsByGenreInputDTO = {
				data: req.params.genre,
			} as FindArtistsByGenreInputDTO
			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices)
			const { data, error } = await findArtistsByGenre.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}
}
