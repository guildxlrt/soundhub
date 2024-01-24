import { ApiErrHandler, ApiRequest, ApiReply, databaseServices } from "Infra-backend"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	FindAnnouncesByArtistUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
	EditAnnounceUsecase,
	DeleteAnnounceUsecaseParams,
	AnnounceUsecaseParams,
	IDUsecaseParams,
	Announce,
} from "Domain"
import {
	CreateAnnounceReplyDTO,
	CreateAnnounceReqDTO,
	DeleteAnnounceReplyDTO,
	FileType,
	FindAnnouncesByArtistReplyDTO,
	GetAllAnnouncesReplyDTO,
	GetAnnounceReplyDTO,
	EditAnnounceReplyDTO,
	EditAnnounceReqDTO,
	apiError,
} from "Shared"
import { IAnnoncesCtrl } from "../../assets"

export class AnnoncesController implements IAnnoncesCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiError[405].message })

			const { text, title } = req.body as CreateAnnounceReqDTO
			const owner = req.auth?.profileID as number
			const file: FileType = req.file as FileType

			// Operators
			// ... doing some heathcheck

			const announce = new Announce(null, owner, title, text, null)

			// Saving Profile
			const createAnnounce = new CreateAnnounceUsecase(databaseServices, true)
			const { data, error } = await createAnnounce.execute(
				new AnnounceUsecaseParams(announce, file)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new CreateAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async edit(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiError[405].message })

			const file: FileType = req.file as FileType
			const owner = req.auth?.profileID as number

			const { text, title, id, imagePath } = req.body as EditAnnounceReqDTO
			// Operators
			// ... doing some heathcheck

			const announce = new Announce(id, owner, title, text, imagePath)

			// Saving Profile
			const EditAnnounce = new EditAnnounceUsecase(databaseServices, true)
			const { data, error } = await EditAnnounce.execute(
				new AnnounceUsecaseParams(announce, file)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new EditAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "DELETE")
				return res.status(405).send({ error: apiError[405].message })
			const user = req.auth?.profileID as number
			const id = Number(req.params["id"])

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(databaseServices, true)
			const { data, error } = await deleteAnnounce.execute(
				new DeleteAnnounceUsecaseParams(id, user)
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
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])
			const getAnnounce = new GetAnnounceUsecase(databaseServices, true)
			const { data, error } = await getAnnounce.execute(new IDUsecaseParams(id))

			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const getAllAnnounces = new GetAllAnnouncesUsecase(databaseServices, true)
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
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])
			const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(databaseServices, true)
			const { data, error } = await findAnnouncesByArtist.execute(new IDUsecaseParams(id))

			if (error) throw error

			// Return infos
			return res.status(200).send(new FindAnnouncesByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
