import { errorMsg, ApiRequest, ApiReply, Token, authExpires } from "Shared-utils"
import {
	CreateArtistInputDTO,
	FindArtistsByGenreInputDTO,
	GetArtistByEmailInputDTO,
	GetArtistByIdInputDTO,
	ModifyArtistInputDTO,
} from "Dto"
import {
	CreateArtistUsecase,
	FindArtistsByGenreUsecase,
	GetAllArtistsUsecase,
	GetArtistByEmailUsecase,
	GetArtistByIdUsecase,
	ModifyArtistUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { formatters, validators } from "Operators"
import { IArtistController, ctrlrErrHandler } from "../assets"
import { Artist, NewArtistParams, ModifyArtistParams, UserAuth } from "Domain"

export class ArtistsController implements IArtistController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body as CreateArtistInputDTO

			const { genres, name, bio, members } = inputs.profile
			const { email, password, confirmEmail, confirmPass } = inputs.auths

			// SANITIZE
			// auths
			validators.signupAuths(email, password, confirmEmail, confirmPass)
			const hash = await formatters.passwd(password)
			const hashedPass = hash
			// genres
			const cleanGenres = formatters.genres(genres)
			// others data checking
			// ... ( name)

			// Saving
			const userData = {
				profile: new Artist(undefined, undefined, name, bio, members, cleanGenres, null),
				auths: new UserAuth(undefined, email, hashedPass),
			}

			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute(new NewArtistParams(userData))
			if (error) throw error

			// Return infos
			const token = new Token().generate(data.userAuthId)

			return res
				.cookie("jwt", token, {
					maxAge: authExpires.oneWeek,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
				.status(202)
				.send(data.message)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body as ModifyArtistInputDTO

			const { genres, name, bio, members } = inputs

			// SANITIZE
			// genres
			const cleanGenres = formatters.genres(genres)
			// others data checking
			// ... ( name)

			// Saving
			const userData = new Artist(undefined, undefined, name, bio, members, cleanGenres, null)

			// Saving Changes
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(new ModifyArtistParams(userData))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async getById(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body.id as GetArtistByIdInputDTO

			const getArtistById = new GetArtistByIdUsecase(databaseServices)
			const { data, error } = await getArtistById.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async getByEmail(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body.email as GetArtistByEmailInputDTO

			const getArtistByEmail = new GetArtistByEmailUsecase(databaseServices)
			const { data, error } = await getArtistByEmail.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const getAllArtists = new GetAllArtistsUsecase(databaseServices)
			const { data, error } = await getAllArtists.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.params.genre as FindArtistsByGenreInputDTO

			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices)
			const { data, error } = await findArtistsByGenre.execute({ genre: inputs })
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
