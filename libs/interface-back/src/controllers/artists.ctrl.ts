import { ArtistsImplement, BcryptService, StorageImplement, ValidatorService } from "Infra-backend"
import {
	UpdateArtistDTO,
	htmlError,
	ResponseDTO,
	NewArtistDTO,
	ErrorMsg,
	ExpressRequest,
	ExpressResponse,
} from "Shared"
import { StreamFile } from "Domain"
import {
	UpdateArtistUsecaseParams,
	NewArtistUsecaseParams,
	CreateArtistUsecase,
	FindArtistsByGenreUsecase,
	GetAllArtistsUsecase,
	GetArtistByEmailUsecase,
	GetArtistByIDUsecase,
	UpdateArtistUsecase,
	IDUsecaseParams,
	GenreUsecaseParams,
	StorageService,
	ArtistsService,
	EmailUsecaseParams,
} from "Application"
import { ApiErrorHandler, Cookie, IArtistCtrl } from "../assets"

export class ArtistsController implements IArtistCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as NewArtistDTO
			const file = req.image as StreamFile
			const params = NewArtistUsecaseParams.fromDto(dto, file)

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
				.status(202)
				.send(new ResponseDTO(true, error))
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async update(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const dto = req.body as UpdateArtistDTO
			const file = req.image as StreamFile
			const params = UpdateArtistUsecaseParams.fromDto(dto, user, file)

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

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

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

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)

			// Calling database
			const getAllArtists = new GetAllArtistsUsecase(artistsService)
			const { data, error } = await getAllArtists.execute()

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

		const email = req.query?.["email"] as string
		const genre = req.query?.["genre"] as string

		// Services
		const artistsImplement = new ArtistsImplement()
		const artistsService = new ArtistsService(artistsImplement)

		if (email) {
			try {
				const params = new EmailUsecaseParams(email)

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

		if (genre) {
			try {
				const params = new GenreUsecaseParams(genre)

				// Calling database
				const findArtistsByGenre = new FindArtistsByGenreUsecase(artistsService)
				const { data, error } = await findArtistsByGenre.execute(params)

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
