import {
	Artist,
	CreateArtistReqDTO,
	GenreType,
	GetArtistByEmailReqDTO,
	ModifyArtistParams,
	ModifyArtistReqDTO,
	NewArtistParams,
	UserAuth,
	apiErrorMsg,
	encryptors,
} from "Shared"

import {
	CreateArtistUsecase,
	FindArtistsByGenreUsecase,
	GetAllArtistsUsecase,
	GetArtistByEmailUsecase,
	GetArtistByIdUsecase,
	ModifyArtistUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import {
	IArtistController,
	Token,
	authExpires,
	errHandler,
	ApiRequest,
	ApiReply,
} from "../../assets"

export class ArtistsController implements IArtistController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const { profile, auth, authConfirm } = req.body as CreateArtistReqDTO

			// HashPass
			const { password, email } = auth
			const hashedPass = await encryptors.hashPass(password)

			// Call DB
			const { bio, genres, members, name } = profile
			const artistProfile = new Artist(
				undefined,
				undefined,
				name,
				bio,
				members,
				genres,
				undefined
			)
			const userAuth = new UserAuth(undefined, email, password)
			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute(
				new NewArtistParams(artistProfile, userAuth, authConfirm, hashedPass)
			)
			if (error) throw error

			// Return infos
			const expires = authExpires.oneYear
			const id = data?.userAuthId
			const token = new Token().generate(id, expires)

			return res
				.cookie("jwt", token, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
				.status(202)
				.send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const user = req.auth?.artistId
			const { bio, genres, members, name } = req.body as ModifyArtistReqDTO

			// Saving Changes
			const artistProfile = new Artist(
				undefined,
				undefined,
				name,
				bio,
				members,
				genres,
				undefined
			)
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(
				new ModifyArtistParams(artistProfile, user)
			)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async getById(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])

			const getArtistById = new GetArtistByIdUsecase(databaseServices)
			const { data, error } = await getArtistById.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async getByEmail(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs = req.body.email as GetArtistByEmailReqDTO

			const getArtistByEmail = new GetArtistByEmailUsecase(databaseServices)
			const { data, error } = await getArtistByEmail.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const getAllArtists = new GetAllArtistsUsecase(databaseServices)
			const { data, error } = await getAllArtists.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const params = req.params["genre"] as GenreType

			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices)
			const { data, error } = await findArtistsByGenre.execute(params)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}
}
