import { errorMsg, ApiRequest, ApiReply, Token } from "Shared-utils"
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
import { formatters } from "Operators"
import { IArtistController, authExpires, errHandler } from "../assets"

export class ArtistsController implements IArtistController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body as CreateArtistInputDTO

			const { password } = inputs.auths

			// Hash
			const hash = await formatters.passwd(password)
			const hashedPass = hash

			// Call DB
			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute({
				data: inputs,
				cleanPass: hashedPass,
			})
			if (error) throw error

			// Return infos
			const expires = authExpires.oneYear
			const token = new Token().generate(data.userAuthId, expires)

			return res
				.cookie("jwt", token, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
				.status(202)
				.send(data.message)
		} catch (error) {
			errHandler(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.body as ModifyArtistInputDTO

			// Saving Changes
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			errHandler(error, res)
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
			errHandler(error, res)
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
			errHandler(error, res)
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
			errHandler(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs = req.params.genre as FindArtistsByGenreInputDTO

			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices)
			const { data, error } = await findArtistsByGenre.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}
}
