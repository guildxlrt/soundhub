import { ApiErrHandler, ApiRequest, ApiReply, databaseRepos } from "Infra-backend"
import {
	CreateArtistReplyDTO,
	CreateArtistReqDTO,
	FindArtistsByGenreReplyDTO,
	GenreType,
	GetAllArtistsReplyDTO,
	GetArtistByEmailReplyDTO,
	GetArtistByEmailReqDTO,
	GetArtistByIDReplyDTO,
	UpdateArtistReplyDTO,
	UpdateArtistReqDTO,
	FileType,
	htmlError,
	ILoginSucc,
	validators,
	IMAGE_MIME_TYPES,
	formatters,
} from "Shared"
import { Artist, UserAuth } from "Domain"
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
} from "Application"
import { IArtistCtrl } from "../assets"

export class ArtistsController implements IArtistCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST")
				return res.status(405).send({ error: htmlError[405].message })

			const { profile, auth, authConfirm } = req.body as CreateArtistReqDTO
			const file: FileType = req.file as FileType

			// Data
			const { password, email } = auth
			const { confirmEmail, confirmPass } = authConfirm
			const { bio, genres, members, name } = profile
			const artistProfile = new Artist(null, null, name, bio, members, genres, null)

			const userAuth = new UserAuth(null, email, password)

			// OPERATORS
			// auths
			validators.signupAuths(
				{
					email: email,
					password: password,
					confirmEmail: confirmEmail,
					confirmPass: confirmPass,
				},
				true
			)
			// genres
			const cleanGenres = formatters.genres(genres)
			artistProfile.setGenres(cleanGenres)
			// file
			if (file) validators.file(file, IMAGE_MIME_TYPES)
			// others data checking
			// ... ( name)

			// Saving Profile
			const createArtist = new CreateArtistUsecase(databaseRepos)
			const { data, error } = await createArtist.execute(
				new NewArtistUsecaseParams(artistProfile, userAuth, authConfirm, file)
			)
			if (error) throw error

			// Return infos
			const cookie = data as ILoginSucc
			return res
				.cookie(cookie?.name, cookie?.val, cookie?.options)
				.status(202)
				.send(new CreateArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async update(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: htmlError[405].message })

			const user = req.auth?.profileID as number
			const { bio, genres, members, name, id, avatarPath, avatarDel } =
				req.body as UpdateArtistReqDTO
			const file: FileType = req.file as FileType

			const artistProfile = new Artist(id, user, name, bio, members, genres, avatarPath)

			// OPERATORS
			// genres
			const cleanGenres = formatters.genres(genres)
			artistProfile.setGenres(cleanGenres)
			// file
			if (file) validators.file(file, IMAGE_MIME_TYPES)
			// others data checking
			// ... ( name)

			// Saving Changes
			const editArtist = new UpdateArtistUsecase(databaseRepos)
			const { data, error } = await editArtist.execute(
				new UpdateArtistUsecaseParams(
					{ profile: artistProfile, avatarDel: avatarDel },
					file
				)
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
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])

			const getArtistByID = new GetArtistByIDUsecase(databaseRepos)
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
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const inputs = req.body.email as GetArtistByEmailReqDTO

			const getArtistByEmail = new GetArtistByEmailUsecase(databaseRepos)
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
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const getAllArtists = new GetAllArtistsUsecase(databaseRepos)
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
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const genre = req.params["genre"] as GenreType

			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseRepos)
			const { data, error } = await findArtistsByGenre.execute(new GenreUsecaseParams(genre))
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindArtistsByGenreReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
