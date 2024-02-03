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
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private announcesImplement = new AnnouncesImplement()
	private announcesService = new AnnouncesService(this.announcesImplement)

	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as CreateAnnounceDTO
			const owner = req.auth?.profileID as number
			const file = req.image as StreamFile

			// Saving Profile
			const createAnnounce = new CreateAnnounceUsecase(
				this.announcesService,
				this.storageService
			)
			const params = NewAnnounceUsecaseParams.fromDto(dto, owner, file)

			const { data, error } = await createAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(201).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const file = req.image as StreamFile
			const owner = req.auth?.profileID as number

			const dto = req.body as EditAnnounceDTO

			// Saving Profile
			const EditAnnounce = new EditAnnounceUsecase(this.announcesService, this.storageService)
			const params = EditAnnounceUsecaseParams.fromDto(dto, owner, file)

			const { data, error } = await EditAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async delete(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])
			const user = req.auth?.profileID as number
			const id = Number(req.params["id"])

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(
				this.announcesService,
				this.storageService
			)
			const params = DeleteAnnounceUsecaseParams.fromDtoBackend(id, user)

			const { data, error } = await deleteAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)
			const getAnnounce = new GetAnnounceUsecase(this.announcesService)

			const { data, error } = await getAnnounce.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const getAllAnnounces = new GetAllAnnouncesUsecase(this.announcesService)
			const { data, error } = await getAllAnnounces.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async findMany(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const date = req.query?.["date"] as string
		const artistID = req.query?.["artist"] as string

		if (artistID) {
			try {
				const params = new IDUsecaseParams(artistID)
				const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(
					this.announcesService
				)

				const { data, error } = await findAnnouncesByArtist.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}
		if (date) {
			try {
				const params = DateUsecaseParams.fromReqParams(date)
				const findAnnouncesByArtist = new FindAnnouncesByDateUsecase(this.announcesService)

				const { data, error } = await findAnnouncesByArtist.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		return res.status(400).end()
	}
}
