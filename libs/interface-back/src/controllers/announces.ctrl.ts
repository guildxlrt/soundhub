import { AnnouncesImplement, ApiErrHandler, StorageImplement } from "Infra-backend"
import { Announce } from "Domain"
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
	AnnouncesService,
	StorageService,
} from "Application"
import {
	CreateAnnounceReplyDTO,
	CreateAnnounceReqDTO,
	DeleteAnnounceReplyDTO,
	IFile,
	FindAnnouncesByArtistReplyDTO,
	GetAllAnnouncesReplyDTO,
	GetAnnounceReplyDTO,
	EditAnnounceReplyDTO,
	EditAnnounceReqDTO,
	htmlError,
	IMAGE_MIME_TYPES,
	validators,
	ApiRes,
	ApiRequest,
} from "Shared"
import { IAnnoncesCtrl } from "../assets"

export class AnnoncesController implements IAnnoncesCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private announcesImplement = new AnnouncesImplement()
	private announcesService = new AnnouncesService(this.announcesImplement)

	async create(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST")
				return res.status(405).send({ error: htmlError[405].message })

			const { text, title } = req.body as CreateAnnounceReqDTO
			const owner = req.auth?.profileID as number
			const file: IFile = req.image as IFile

			// OPERATORS
			// file
			if (file) validators.file(file, IMAGE_MIME_TYPES)

			const announce = new Announce(null, owner, title, text, null)

			// Saving Profile
			const createAnnounce = new CreateAnnounceUsecase(
				this.announcesService,
				this.storageService
			)
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

	async edit(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST")
				return res.status(405).send({ error: htmlError[405].message })

			const file: IFile = req.image as IFile
			const owner = req.auth?.profileID as number

			const { text, title, id, imagePath } = req.body as EditAnnounceReqDTO

			// Operators
			// ... doing some heathcheck

			const announce = new Announce(id, owner, title, text, imagePath)

			// Saving Profile
			const EditAnnounce = new EditAnnounceUsecase(this.announcesService, this.storageService)
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

	async delete(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "DELETE")
				return res.status(405).send({ error: htmlError[405].message })
			const user = req.auth?.profileID as number
			const id = Number(req.params["id"])

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(
				this.announcesService,
				this.storageService
			)
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

	async get(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const getAnnounce = new GetAnnounceUsecase(this.announcesService)
			const { data, error } = await getAnnounce.execute(new IDUsecaseParams(id))

			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAnnounceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const getAllAnnounces = new GetAllAnnouncesUsecase(this.announcesService)
			const { data, error } = await getAllAnnounces.execute()

			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllAnnouncesReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(this.announcesService)
			const { data, error } = await findAnnouncesByArtist.execute(new IDUsecaseParams(id))

			if (error) throw error

			// Return infos
			return res.status(200).send(new FindAnnouncesByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
