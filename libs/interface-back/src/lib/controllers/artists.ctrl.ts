import { databaseServices } from "Infra-backend"
import {
	CreateArtistReplyDTO,
	CreateArtistReqDTO,
	FindArtistsByGenreReplyDTO,
	GenreType,
	GetAllArtistsReplyDTO,
	GetArtistByEmailReplyDTO,
	GetArtistByEmailReqDTO,
	GetArtistByIDReplyDTO,
	IArtist,
	IUserAuth,
	UpdateArtistReplyDTO,
	UpdateArtistReqDTO,
	PassEncryptor,
	FileType,
	apiError,
} from "Shared"
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
} from "Domain"
import { IArtistCtrl, Token, authExpires, ApiErrHandler, ApiRequest, ApiReply } from "../../assets"

export class ArtistsController implements IArtistCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiError[405].message })

			const { profile, auth, authConfirm } = req.body as CreateArtistReqDTO
			const file: FileType = req.file as FileType

			// HashPass
			const { password, email } = auth
			const hashedPass = await PassEncryptor.hash(password)

			// Data
			const { bio, genres, members, name } = profile
			const artistProfile: IArtist = {
				user_auth_id: null,
				name: name,
				bio: bio,
				members: members,
				genres: genres,
				avatarUrl: null,
			}
			const userAuth: IUserAuth = { email: email, password: password }

			// Saving Profile
			const createArtist = new CreateArtistUsecase(databaseServices, true)
			const { data, error } = await createArtist.execute(
				new NewArtistUsecaseParams(artistProfile, userAuth, authConfirm, hashedPass, file)
			)
			if (error) throw error

			// Return infos
			const expires = authExpires.oneYear
			const userCookie = data?.userCookie

			const token = Token.generate(userCookie, expires)

			return res
				.cookie("jwt", token, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
				.status(202)
				.send(new CreateArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async update(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: apiError[405].message })

			const user = req.auth?.profileID as number
			const { bio, genres, members, name } = req.body as UpdateArtistReqDTO
			const file: FileType = req.file as FileType

			const artistProfile: IArtist = {
				user_auth_id: user,
				name: name,
				bio: bio,
				members: members,
				genres: genres,
				avatarUrl: null,
			}

			// Saving Changes
			const editArtist = new UpdateArtistUsecase(databaseServices, true)
			const { data, error } = await editArtist.execute(
				new UpdateArtistUsecaseParams(artistProfile, file)
			)
			if (error) throw error

			// Return infos
			return res.status(200).send(new UpdateArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getByID(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])

			const getArtistByID = new GetArtistByIDUsecase(databaseServices, true)
			const { data, error } = await getArtistByID.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetArtistByIDReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getByEmail(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const inputs = req.body.email as GetArtistByEmailReqDTO

			const getArtistByEmail = new GetArtistByEmailUsecase(databaseServices, true)
			const { data, error } = await getArtistByEmail.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetArtistByEmailReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const getAllArtists = new GetAllArtistsUsecase(databaseServices, true)
			const { data, error } = await getAllArtists.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllArtistsReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const genre = req.params["genre"] as GenreType

			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices, true)
			const { data, error } = await findArtistsByGenre.execute(new GenreUsecaseParams(genre))
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindArtistsByGenreReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
