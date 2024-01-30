import {
	ApiErrHandler,
	ApiRequest,
	ApiRes,
	ArtistsImplement,
	StorageImplement,
} from "Infra-backend"
import {
	GenreType,
	UpdateArtistDTO,
	htmlError,
	validators,
	IMAGE_MIME_TYPES,
	formatters,
	ReplyDTO,
	NewArtistDTO,
	ErrorMsg,
	UserEmail,
} from "Shared"
import { Artist, File, UserAuth, UserCookie } from "Domain"
import {
	UpdateArtistParamsAdapter,
	NewArtistParamsAdapter,
	CreateArtistUsecase,
	FindArtistsByGenreUsecase,
	GetAllArtistsUsecase,
	GetArtistByEmailUsecase,
	GetArtistByIDUsecase,
	UpdateArtistUsecase,
	IDParamsAdapter,
	GenreParamsAdapter,
	StorageService,
	ArtistsService,
	EmailParamsAdapter,
} from "Application"
import { IArtistCtrl } from "../assets"

export class ArtistsController implements IArtistCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private artistsImplement = new ArtistsImplement()
	private artistsService = new ArtistsService(this.artistsImplement)

	async create(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST")
				return res.status(405).send({ error: htmlError[405].message })

			const dto = req.body as NewArtistDTO
			const file = req.image as File
			const params = NewArtistParamsAdapter.fromDto(dto, file)

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
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const cookie = data as UserCookie
			return res
				.cookie(cookie?.name, cookie?.val, cookie?.options)
				.status(202)
				.send(new ReplyDTO(true))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async update(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: htmlError[405].message })

			const user = req.auth?.profileID as number
			const dto = req.body as UpdateArtistDTO
			const file = req.image as File
			const params = UpdateArtistParamsAdapter.fromDto(dto, user, file)

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

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getByID(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const params = new IDParamsAdapter(id)

			const getArtistByID = new GetArtistByIDUsecase(this.artistsService)
			const { data, error } = await getArtistByID.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getByEmail(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const inputs = req.body.email as UserEmail
			const params = new EmailParamsAdapter(inputs)

			const getArtistByEmail = new GetArtistByEmailUsecase(this.artistsService)
			const { data, error } = await getArtistByEmail.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const getAllArtists = new GetAllArtistsUsecase(this.artistsService)
			const { data, error } = await getAllArtists.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const genre = req.params["genre"] as GenreType
			const params = new GenreParamsAdapter(genre)

			const findArtistsByGenre = new FindArtistsByGenreUsecase(this.artistsService)
			const { data, error } = await findArtistsByGenre.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
