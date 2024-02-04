import { AnnouncesImplement, StorageImplement } from "Infra-backend"
import { StreamFile } from "Domain"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	FindAnnouncesByArtistUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
	EditAnnounceUsecase,
	DeleteAnnounceUsecaseParams,
	IDUsecaseParams,
	AnnouncesService,
	StorageService,
	EditAnnounceUsecaseParams,
	NewAnnounceUsecaseParams,
	FindAnnouncesByDateUsecase,
	DateUsecaseParams,
} from "Application"
import {
	htmlError,
	ResponseDTO,
	CreateAnnounceDTO,
	EditAnnounceDTO,
	ErrorMsg,
	ExpressRequest,
	ExpressResponse,
} from "Shared"
import { ApiErrorHandler, IAnnoncesCtrl } from "../assets"

export class AnnoncesController implements IAnnoncesCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as CreateAnnounceDTO
			const owner = req.auth?.profileID as number
			const file = req.image as StreamFile

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const createAnnounce = new CreateAnnounceUsecase(announcesService, storageService)
			const params = NewAnnounceUsecaseParams.fromDto(dto, owner, file)

			const { data, error } = await createAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(201).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const file = req.image as StreamFile
			const owner = req.auth?.profileID as number

			const dto = req.body as EditAnnounceDTO

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const EditAnnounce = new EditAnnounceUsecase(announcesService, storageService)
			const params = EditAnnounceUsecaseParams.fromDto(dto, owner, file)

			const { data, error } = await EditAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async delete(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])
			const user = req.auth?.profileID as number
			const id = Number(req.params["id"])

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const deleteAnnounce = new DeleteAnnounceUsecase(announcesService, storageService)
			const params = DeleteAnnounceUsecaseParams.fromDtoBackend(id, user)

			const { data, error } = await deleteAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)

			// Calling database
			const getAnnounce = new GetAnnounceUsecase(announcesService)

			const { data, error } = await getAnnounce.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)

			// Calling database
			const getAllAnnounces = new GetAllAnnouncesUsecase(announcesService)
			const { data, error } = await getAllAnnounces.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async findMany(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const date = req.query?.["date"] as string
		const artistID = req.query?.["artist"] as string

		// Services
		const announcesImplement = new AnnouncesImplement()
		const announcesService = new AnnouncesService(announcesImplement)

		if (artistID) {
			try {
				const params = new IDUsecaseParams(artistID)

				// Calling database
				const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(announcesService)

				const { data, error } = await findAnnouncesByArtist.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}
		if (date) {
			try {
				const params = DateUsecaseParams.fromReqParams(date)

				// Calling database
				const findAnnouncesByArtist = new FindAnnouncesByDateUsecase(announcesService)

				const { data, error } = await findAnnouncesByArtist.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}

		return res.status(400).end()
	}
}
