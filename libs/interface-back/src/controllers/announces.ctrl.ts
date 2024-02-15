import { AnnouncesImplement, StorageImplement } from "Infra-backend"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
	EditAnnounceUsecase,
	DeleteAnnounceUsecaseParams,
	IDUsecaseParams,
	AnnouncesService,
	StorageService,
	EditAnnounceUsecaseParams,
	NewAnnounceUsecaseParams,
	FindAnnouncesByArtistUsecase,
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
	GetAnnounceShortDTO,
	SearchResponseDTO,
} from "Shared"
import { ApiErrorHandler, IAnnoncesCtrl } from "../assets"

export class AnnoncesController implements IAnnoncesCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as CreateAnnounceDTO
			const authID = req.auth?.authID as number
			const file = req.image as unknown

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const createAnnounce = new CreateAnnounceUsecase(announcesService, storageService)
			const params = NewAnnounceUsecaseParams.fromBackend(dto, authID, file)

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

			const file = req.image as unknown
			const authID = req.auth?.authID as number

			const dto = req.body as EditAnnounceDTO

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const EditAnnounce = new EditAnnounceUsecase(announcesService, storageService)
			const params = EditAnnounceUsecaseParams.fromBackend(dto, authID, file)

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
			const authID = req.auth?.authID as number
			const id = Number(req.params["id"])

			// Services
			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const deleteAnnounce = new DeleteAnnounceUsecase(announcesService, storageService)
			const params = DeleteAnnounceUsecaseParams.fromBackend(id, authID)

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
			const params = IDUsecaseParams.fromBackend(id)

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

	async search(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const date = req.query?.["date"] as string
			const artistID = req.query?.["artist-id"] as string
			const genre = req.query?.["genre"] as string

			const results: GetAnnounceShortDTO[] = []
			const errors: ErrorMsg[] = []

			const announcesImplement = new AnnouncesImplement()
			const announcesService = new AnnouncesService(announcesImplement)

			if (artistID) {
				const params = IDUsecaseParams.fromBackend(artistID)
				const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(announcesService)
				const resultsByArtist = await findAnnouncesByArtist.execute(params)

				if (resultsByArtist.data) results.push(...resultsByArtist.data)
				if (resultsByArtist.error) errors.push(resultsByArtist.error)
			} else if (date) {
				const params = DateUsecaseParams.fromBackend(date)
				const findAnnouncesByArtist = new FindAnnouncesByDateUsecase(announcesService)
				const resultsByDate = await findAnnouncesByArtist.execute(params)

				if (resultsByDate.data) results.push(...resultsByDate.data)
				if (resultsByDate.error) errors.push(resultsByDate.error)
			} else if (!genre || !artistID) {
				// Services
				const announcesImplement = new AnnouncesImplement()
				const announcesService = new AnnouncesService(announcesImplement)

				// Calling database
				const getAllAnnounces = new GetAllAnnouncesUsecase(announcesService)
				const resultsAll = await getAllAnnounces.execute()

				if (resultsAll.data) results.push(...resultsAll.data)
				if (resultsAll.error) errors.push(resultsAll.error)
			}

			// RETURN RESULTS
			const reponse = new SearchResponseDTO([...new Set(results)], errors)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
