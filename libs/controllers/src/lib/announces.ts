import {
	CreateAnnounceInputDTO,
	DeleteAnnounceInputDTO,
	FindAnnouncesByArtistInputDTO,
	GetAllAnnouncesInputDTO,
	GetAnnounceInputDTO,
} from "Dto"
import { ApiRequest, ApiReply, IAnnoncesController } from "../assets"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	FindAnnouncesByArtistUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { apiError } from "../assets"

export class AnnoncesController implements IAnnoncesController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: CreateAnnounceInputDTO = req.body as CreateAnnounceInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const createAnnounce = new CreateAnnounceUsecase(databaseServices)
			const { data, error } = await createAnnounce.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async delete(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: DeleteAnnounceInputDTO = req.body as DeleteAnnounceInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(databaseServices)
			const { data, error } = await deleteAnnounce.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: GetAnnounceInputDTO = req.body as GetAnnounceInputDTO
			const getAnnounce = new GetAnnounceUsecase(databaseServices)
			const { data, error } = await getAnnounce.execute(inputs)

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
			const inputs: GetAllAnnouncesInputDTO = req.body as GetAllAnnouncesInputDTO
			const getAllAnnounces = new GetAllAnnouncesUsecase(databaseServices)
			const { data, error } = await getAllAnnounces.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: FindAnnouncesByArtistInputDTO = req.body as FindAnnouncesByArtistInputDTO
			const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(databaseServices)
			const { data, error } = await findAnnouncesByArtist.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}
}
