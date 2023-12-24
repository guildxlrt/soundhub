import { ApiRequest, ApiReply } from "../assets"
import { apiError } from "Shared-utils"
import {
	CreateArtistInputDTO,
	FindArtistsByGenreInputDTO,
	GetAllArtistsInputDTO,
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

interface IArtistController {
	create(req: unknown, res: unknown): Promise<unknown>
	modify(req: unknown, res: unknown): Promise<unknown>
	getAll(req: unknown, res: unknown): Promise<unknown>
	getById(req: unknown, res: unknown): Promise<unknown>
	getByEmail(req: unknown, res: unknown): Promise<unknown>
	findManyByGenre(req: unknown, res: unknown): Promise<unknown>
}

export class ArtistsController implements IArtistController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: CreateArtistInputDTO = req.body as CreateArtistInputDTO
			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute(inputs)

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: ModifyArtistInputDTO = req.body as ModifyArtistInputDTO
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(inputs)

			// Operators
			// ... doing some heathcheck

			// Saving Changes
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async getById(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: GetArtistByIdInputDTO = req.body as GetArtistByIdInputDTO
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
		if (req.method !== "GET") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: GetArtistByEmailInputDTO = req.body as GetArtistByEmailInputDTO
			const getArtistById = new GetArtistByEmailUsecase(databaseServices)
			const { data, error } = await getArtistById.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: GetAllArtistsInputDTO = req.body as GetAllArtistsInputDTO
			const getAllArtists = new GetAllArtistsUsecase(databaseServices)
			const { data, error } = await getAllArtists.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: FindArtistsByGenreInputDTO = req.body as FindArtistsByGenreInputDTO
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
