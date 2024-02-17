import { ArtistsImplement, BcryptService, StorageImplement, ValidatorService } from "Infra-backend"
import {
	UpdateArtistDTO,
	htmlError,
	ResponseDTO,
	NewArtistDTO,
	ErrorMsg,
	ExpressRequest,
	ExpressResponse,
	StatusDTO,
	ItemStatusType,
} from "Shared"
import {
	UpdateArtistUsecaseParams,
	NewArtistUsecaseParams,
	CreateArtistUsecase,
	GetArtistByIDUsecase,
	UpdateArtistUsecase,
	IDUsecaseParams,
	StorageService,
	ArtistsService,
	EmailUsecaseParams,
	GetArtistByEmailUsecase,
	SetStatusArtistUsecaseParams,
	SetStatusArtistUsecase,
} from "Application"
import { ApiErrorHandler, Cookie, IArtistsCtrl } from "../assets"

export class ArtistsController implements IArtistsCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as NewArtistDTO
			const file = req.image as unknown
			const params = NewArtistUsecaseParams.fromBackend(dto, file)

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)
			const passwordService = new BcryptService()
			const validationService = new ValidatorService()

			// Calling database
			const createArtist = new CreateArtistUsecase(
				artistsService,
				storageService,
				passwordService,
				validationService
			)
			const { data, error } = await createArtist.execute(params)

			if (error) throw error
			if (!data || typeof data === "boolean") throw ErrorMsg.htmlError(htmlError[500])

			const cookie = new Cookie(data)
			return res
				.cookie(cookie?.name, cookie?.val, cookie?.options)
				.status(201)
				.send(new ResponseDTO(true, error))
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async update(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const authID = req.auth?.authID as number
			const dto = req.body as UpdateArtistDTO
			const file = req.image as unknown
			const params = UpdateArtistUsecaseParams.fromBackend(dto, authID, file)

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database Changes
			const editArtist = new UpdateArtistUsecase(artistsService, storageService)
			const { data, error } = await editArtist.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async setStatus(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PATCH") throw ErrorMsg.htmlError(htmlError[405])

			const authID = req.auth?.authID as number
			const { id, status }: StatusDTO = req.body as StatusDTO
			const params = SetStatusArtistUsecaseParams.fromBackend(
				id,
				status as ItemStatusType,
				authID
			)

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)

			// Calling database
			const setStatusArtist = new SetStatusArtistUsecase(artistsService)
			const { data, error } = await setStatusArtist.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async getByID(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = IDUsecaseParams.fromBackend(id)

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)

			// Calling database
			const getArtistByID = new GetArtistByIDUsecase(artistsService)
			const { data, error } = await getArtistByID.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async getByEmail(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const email = req.query?.["email"] as string
			const params = new EmailUsecaseParams(email)

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)

			// Calling database
			const getArtistByEmail = new GetArtistByEmailUsecase(artistsService)
			const { data, error } = await getArtistByEmail.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
