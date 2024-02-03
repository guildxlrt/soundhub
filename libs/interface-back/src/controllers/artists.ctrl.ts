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
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private artistsImplement = new ArtistsImplement()
	private artistsService = new ArtistsService(this.artistsImplement)

	private passwordService = new BcryptService()
	private validationService = new ValidatorService()

	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as NewArtistDTO
			const file = req.image as StreamFile
			const params = NewArtistUsecaseParams.fromDto(dto, file)

			// Saving Profile
			const createArtist = new CreateArtistUsecase(
				this.artistsService,
				this.storageService,
				this.passwordService,
				this.validationService
			)
			const { data, error } = await createArtist.execute(params)

			if (error) throw error
			if (!data || typeof data === "boolean") throw ErrorMsg.htmlError(htmlError[500])

			const cookie = new Cookie(data)
			return res
				.cookie(cookie?.name, cookie?.val, cookie?.options)
				.status(202)
				.send(new ResponseDTO(true))
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async update(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const dto = req.body as UpdateArtistDTO
			const file = req.image as StreamFile
			const params = UpdateArtistUsecaseParams.fromDto(dto, user, file)

			// Saving Changes
			const editArtist = new UpdateArtistUsecase(this.artistsService, this.storageService)
			const { data, error } = await editArtist.execute(params)

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

			const getArtistByID = new GetArtistByIDUsecase(this.artistsService)
			const { data, error } = await getArtistByID.execute(params)

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

			const getAllArtists = new GetAllArtistsUsecase(this.artistsService)
			const { data, error } = await getAllArtists.execute()

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

		const email = req.query?.["email"] as string
		const genre = req.query?.["genre"] as string

		if (email) {
			try {
				const params = new EmailUsecaseParams(email)

				const getArtistByEmail = new GetArtistByEmailUsecase(this.artistsService)
				const { data, error } = await getArtistByEmail.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		if (genre) {
			try {
				const params = new GenreUsecaseParams(genre)

				const findArtistsByGenre = new FindArtistsByGenreUsecase(this.artistsService)
				const { data, error } = await findArtistsByGenre.execute(params)

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
