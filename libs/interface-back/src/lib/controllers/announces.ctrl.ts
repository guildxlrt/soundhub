import { IAnnoncesCtrl } from "../../assets"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	FindAnnouncesByArtistUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
	ModifyAnnounceUsecase,
} from "Domain"
import { databaseServices } from "Infra-backend"
import {
	apiErrorMsg,
	CreateAnnounceReqDTO,
	DeleteAnnounceAdapter,
	IAnnounce,
	ModifyAnnounceAdapter,
	ModifyAnnounceReqDTO,
	NewAnnounceAdapter,
} from "Shared"
import { errHandler, ApiRequest, ApiReply } from "../../assets"

export class AnnoncesController implements IAnnoncesCtrl {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		const { text, title } = req.body as CreateAnnounceReqDTO
		const owner = req.auth?.profileID as number

		try {
			// Operators
			// ... doing some heathcheck

			const announce: IAnnounce = {
				owner_id: owner,
				title: title,
				text: text,
				imageUrl: null,
			}

			// Saving Profile
			const createAnnounce = new CreateAnnounceUsecase(databaseServices)
			const { data, error } = await createAnnounce.execute(
				new NewAnnounceAdapter(announce, undefined)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const owner = req.auth?.profileID as number

			const { text, title } = req.body as ModifyAnnounceReqDTO
			// Operators
			// ... doing some heathcheck

			const announce: IAnnounce = {
				owner_id: owner,
				title: title,
				text: text,
				imageUrl: null,
			}

			// Saving Profile
			const ModifyAnnounce = new ModifyAnnounceUsecase(databaseServices)
			const { data, error } = await ModifyAnnounce.execute(
				new ModifyAnnounceAdapter(announce, undefined)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })
		const user = req.auth?.profileID as number
		const id = Number(req.params["id"])

		try {
			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(databaseServices)
			const { data, error } = await deleteAnnounce.execute(
				new DeleteAnnounceAdapter(id, user)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		const id = Number(req.params["id"])
		const getAnnounce = new GetAnnounceUsecase(databaseServices)
		const { data, error } = await getAnnounce.execute(id)

		try {
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		const getAllAnnounces = new GetAllAnnouncesUsecase(databaseServices)
		const { data, error } = await getAllAnnounces.execute()

		try {
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		const id = Number(req.params["id"])
		const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(databaseServices)
		const { data, error } = await findAnnouncesByArtist.execute(id)

		try {
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}
}
