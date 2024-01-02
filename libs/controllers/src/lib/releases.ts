import { IReleasesController } from "../assets"
import { ApiRequest, ApiReply } from "../assets"
import {
	CreateReleaseInputDTO,
	FindReleasesByArtistInputDTO,
	FindReleasesByGenreInputDTO,
	GetReleaseInputDTO,
	ModifyReleasePriceInputDTO,
} from "Dto"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	FindReleasesByGenreUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	ModifyReleasePriceUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { errorMsg } from "Shared-utils"

export class ReleasesController implements IReleasesController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateReleaseInputDTO = req.body as CreateReleaseInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const createRelease = new CreateReleaseUsecase(databaseServices)
			const { data, error } = await createRelease.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async modifyPrice(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: ModifyReleasePriceInputDTO = req.body as ModifyReleasePriceInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const modifyRelease = new ModifyReleasePriceUsecase(databaseServices)
			const { data, error } = await modifyRelease.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetReleaseInputDTO = req.body as GetReleaseInputDTO
			const getRelease = new GetReleaseUsecase(databaseServices)
			const { data, error } = await getRelease.execute(inputs)

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
			const getAllReleases = new GetAllReleasesUsecase(databaseServices)
			const { data, error } = await getAllReleases.execute()

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindReleasesByArtistInputDTO = req.body as FindReleasesByArtistInputDTO
			const findReleasesByArtist = new FindReleasesByArtistUsecase(databaseServices)
			const { data, error } = await findReleasesByArtist.execute(inputs)

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
			const inputs: FindReleasesByGenreInputDTO = req.body as FindReleasesByGenreInputDTO
			const findReleasesByGenre = new FindReleasesByGenreUsecase(databaseServices)
			const { data, error } = await findReleasesByGenre.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}
}
