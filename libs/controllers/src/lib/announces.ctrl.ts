import {
	CreateAnnounceInputDTO,
	DeleteAnnounceInputDTO,
	FindAnnouncesByArtistInputDTO,
	GetAnnounceInputDTO,
} from "Dto"
import { IAnnoncesController } from "../assets"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	FindAnnouncesByArtistUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { ctrlrErrHandler } from "../assets/error-handler"
import { Announce, IdParams, NewAnnounceParams } from "Domain"

export class AnnoncesController implements IAnnoncesController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateAnnounceInputDTO = req.body as CreateAnnounceInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const { title, text, artist_id } = inputs
			const announceData = new Announce(
				undefined,
				artist_id,
				title,
				text,
				undefined,
				undefined
			)

			const createAnnounce = new CreateAnnounceUsecase(databaseServices)
			const { data, error } = await createAnnounce.execute(
				new NewAnnounceParams(announceData)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
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
			const { data, error } = await deleteAnnounce.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetAnnounceInputDTO = req.body as GetAnnounceInputDTO
			const getAnnounce = new GetAnnounceUsecase(databaseServices)
			const { data, error } = await getAnnounce.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
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
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindAnnouncesByArtistInputDTO = req.body as FindAnnouncesByArtistInputDTO
			const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(databaseServices)
			const { data, error } = await findAnnouncesByArtist.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
