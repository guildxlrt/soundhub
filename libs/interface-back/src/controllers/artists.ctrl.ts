import { ApiErrHandler, ArtistsImplement, StorageImplement } from "Infra-backend"
import {
	GenreType,
	UpdateArtistDTO,
	htmlError,
	ResponseDTO,
	NewArtistDTO,
	ErrorMsg,
	UserEmail,
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
import { Cookie, IArtistCtrl } from "../assets"

export class ArtistsController implements IArtistCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private artistsImplement = new ArtistsImplement()
	private artistsService = new ArtistsService(this.artistsImplement)

	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as NewArtistDTO
			const file = req.image as StreamFile
			const params = NewArtistUsecaseParams.fromDto(dto, file)

			// // Data
			// const { password, email, confirmEmail, confirmPass } = auth
			// const { bio, genres, members, name } = profile
			// // const artistProfile = new Artist(null, null, name, bio, members, genres, null)

			// const userAuth = new UserAuth(null, email, password)

			// // OPERATORS
			// // auths
			// validators.signupAuths({
			// 	email: email,
			// 	password: password,
			// 	confirmEmail: confirmEmail,
			// 	confirmPass: confirmPass,
			// })
			// // genres
			// const cleanGenres = formatters.genres(genres)
			// artistProfile.setGenres(cleanGenres)
			// // file
			// if (file) validators.file(file, IMAGE_MIME_TYPES)
			// // others data checking
			// // ... ( name)

			// Saving Profile
			const createArtist = new CreateArtistUsecase(this.artistsService, this.storageService)
			const { data, error } = await createArtist.execute(params)

			if (error) throw error
			if (!data || typeof data === "boolean") throw ErrorMsg.htmlError(htmlError[500])

			const cookie = new Cookie(data)
			return res
				.cookie(cookie?.name, cookie?.val, cookie?.options)
				.status(202)
				.send(new ResponseDTO(true))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async update(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const dto = req.body as UpdateArtistDTO
			const file = req.image as StreamFile
			const params = UpdateArtistUsecaseParams.fromDto(dto, user, file)

			// // OPERATORS
			// // genres
			// const cleanGenres = formatters.genres(genres)
			// artistProfile.setGenres(cleanGenres)
			// // file
			// if (file) validators.file(file, IMAGE_MIME_TYPES)
			// // others data checking
			// // ... (name)

			// Saving Changes
			const editArtist = new UpdateArtistUsecase(this.artistsService, this.storageService)
			const { data, error } = await editArtist.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getByID(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
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
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getByEmail(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const inputs = req.body.email as UserEmail
			const params = new EmailUsecaseParams(inputs)

			const getArtistByEmail = new GetArtistByEmailUsecase(this.artistsService)
			const { data, error } = await getArtistByEmail.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
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
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByGenre(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const genre = req.params["genre"] as GenreType
			const params = new GenreUsecaseParams(genre)

			const findArtistsByGenre = new FindArtistsByGenreUsecase(this.artistsService)
			const { data, error } = await findArtistsByGenre.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
