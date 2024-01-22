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
	ModifyArtistAdapter,
	ModifyArtistReplyDTO,
	ModifyArtistReqDTO,
	NewArtistAdapter,
	apiErrorMsg,
	PassEncryptor,
	FileType,
} from "Shared"
import {
	CreateArtistUsecase,
	FindArtistsByGenreUsecase,
	GetAllArtistsUsecase,
	GetArtistByEmailUsecase,
	GetArtistByIDUsecase,
	ModifyArtistUsecase,
} from "Domain"
import { databaseServices } from "Infra-backend"
import { IArtistCtrl, Token, authExpires, ApiErrHandler, ApiRequest, ApiReply } from "../../assets"

export class ArtistsController implements IArtistCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

			const { profile, auth, authConfirm } = req.body as CreateArtistReqDTO
			const file: FileType = req.file

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
			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute(
				new NewArtistAdapter(artistProfile, userAuth, authConfirm, hashedPass, file)
			)
			if (error) throw error

			// Return infos
			const expires = authExpires.oneYear
			const userCookie = data?.userCookie

			const token = new Token().generate(userCookie, expires)

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

	async modify(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

			const user = req.auth?.profileID as number
			const { bio, genres, members, name } = req.body as ModifyArtistReqDTO
			const file: FileType = req.file

			const artistProfile: IArtist = {
				user_auth_id: user,
				name: name,
				bio: bio,
				members: members,
				genres: genres,
				avatarUrl: null,
			}

			// Saving Changes
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(
				new ModifyArtistAdapter(artistProfile, file)
			)
			if (error) throw error

			// Return infos
			return res.status(200).send(new ModifyArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getByID(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const id = Number(req.params["id"])

			const getArtistByID = new GetArtistByIDUsecase(databaseServices)
			const { data, error } = await getArtistByID.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetArtistByIDReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getByEmail(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const inputs = req.body.email as GetArtistByEmailReqDTO

			const getArtistByEmail = new GetArtistByEmailUsecase(databaseServices)
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
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const getAllArtists = new GetAllArtistsUsecase(databaseServices)
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
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const params = req.params["genre"] as GenreType

			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices)
			const { data, error } = await findArtistsByGenre.execute(params)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindArtistsByGenreReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
