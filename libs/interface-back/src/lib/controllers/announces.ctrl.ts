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
	CreateAnnounceReplyDTO,
	CreateAnnounceReqDTO,
	DeleteAnnounceAdapter,
	DeleteAnnounceReplyDTO,
	FileType,
	FindAnnouncesByArtistReplyDTO,
	GetAllAnnouncesReplyDTO,
	GetAnnounceReplyDTO,
	IAnnounce,
	ModifyAnnounceAdapter,
	ModifyAnnounceReplyDTO,
	ModifyAnnounceReqDTO,
	NewAnnounceAdapter,
} from "Shared"
import { ApiErrHandler, ApiRequest, ApiReply } from "../../assets"

export class AnnoncesController implements IAnnoncesCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

			const { text, title } = req.body as CreateAnnounceReqDTO
			const owner = req.auth?.profileID as number
			const file: FileType = req.file

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
				new NewAnnounceAdapter(announce, file)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new CreateAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

			const file: FileType = req.file
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
				new ModifyAnnounceAdapter(announce, file)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new ModifyAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })
			const user = req.auth?.profileID as number
			const id = Number(req.params["id"])

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(databaseServices)
			const { data, error } = await deleteAnnounce.execute(
				new DeleteAnnounceAdapter(id, user)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new DeleteAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const id = Number(req.params["id"])
			const getAnnounce = new GetAnnounceUsecase(databaseServices)
			const { data, error } = await getAnnounce.execute(id)

			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const getAllAnnounces = new GetAllAnnouncesUsecase(databaseServices)
			const { data, error } = await getAllAnnounces.execute()

			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllAnnouncesReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const id = Number(req.params["id"])
			const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(databaseServices)
			const { data, error } = await findAnnouncesByArtist.execute(id)

			if (error) throw error

			// Return infos
			return res.status(200).send(new FindAnnouncesByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
