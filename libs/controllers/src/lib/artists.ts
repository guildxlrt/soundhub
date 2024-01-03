import {
	GenreType,
	IModifyArtist,
	INewArtist,
	errorMsg,
	ApiRequest,
	ApiReply,
	Token,
	authExpires,
} from "Shared-utils"
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
import { Artist } from "Domain"

export class ArtistsController implements IArtistController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateArtistInputDTO = {
				data: req.body as INewArtist,
				file: null,
			} as CreateArtistInputDTO

			const { auths, genres, name, bio, members } = inputs.data
			const { email, password, confirmEmail, confirmPass } = auths

			// SANITIZE
			// auths
			validators.signupAuths(email, password, confirmEmail, confirmPass)
			const hash = await formatters.passwd(password)
			auths.cleanPass = hash
			// genres
			const cleanGenres = formatters.genres(genres)
			inputs.data.cleanGenres = cleanGenres
			// others data checking
			// ... ( name)

			// Saving Profile
			const artist = new Artist(999, new Date(), 999, name, bio, members, cleanGenres, null)
			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute(inputs)
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
			const inputs: ModifyArtistInputDTO = {
				data: {
					...(req.body as IModifyArtist),
				},
				file: null,
			} as ModifyArtistInputDTO

			// SANITIZE
			// ... doing some heathcheck

			// Saving Changes
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(inputs)
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
			const inputs: GetArtistByIdInputDTO = {
				data: req.body.id as number,
			} as GetArtistByIdInputDTO
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
			const inputs: GetArtistByEmailInputDTO = {
				data: req.body.email as string,
			} as GetArtistByEmailInputDTO
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
			const inputs: FindArtistsByGenreInputDTO = {
				data: req.params.genre as GenreType,
			} as FindArtistsByGenreInputDTO
			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices)
			const { data, error } = await findArtistsByGenre.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
