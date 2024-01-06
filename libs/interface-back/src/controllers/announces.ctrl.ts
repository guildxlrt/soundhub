import {
	CreateAnnounceInputDTO,
	DeleteAnnounceInputDTO,
	FindAnnouncesByArtistInputDTO,
	GetAnnounceInputDTO,
	ModifyAnnounceInputDTO,
} from "Dto"
import { IAnnoncesController } from "../assets"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	FindAnnouncesByArtistUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
	ModifyAnnounceUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { errHandler } from "../assets/error-handler"

export class AnnoncesController implements IAnnoncesController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateAnnounceInputDTO = req.body as CreateAnnounceInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const createAnnounce = new CreateAnnounceUsecase(databaseServices)
			const { data, error } = await createAnnounce.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: ModifyAnnounceInputDTO = req.body as ModifyAnnounceInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const ModifyAnnounce = new ModifyAnnounceUsecase(databaseServices)
			const { data, error } = await ModifyAnnounce.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: DeleteAnnounceInputDTO = req.body as DeleteAnnounceInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(databaseServices)
			const { data, error } = await deleteAnnounce.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetAnnounceInputDTO = req.body as GetAnnounceInputDTO
			const getAnnounce = new GetAnnounceUsecase(databaseServices)
			const { data, error } = await getAnnounce.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const getAllAnnounces = new GetAllAnnouncesUsecase(databaseServices)
			const { data, error } = await getAllAnnounces.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindAnnouncesByArtistInputDTO = req.body as FindAnnouncesByArtistInputDTO
			const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(databaseServices)
			const { data, error } = await findAnnouncesByArtist.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}
}
