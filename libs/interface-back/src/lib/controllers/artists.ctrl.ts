import {
	CreateArtistReqDTO,
	FindArtistsByGenreReqDTO,
	GetArtistByEmailReqDTO,
	GetArtistByIdReqDTO,
	ModifyArtistReqDTO,
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
			const inputs = req.body as CreateArtistReqDTO

			// HashPass
			const { password } = inputs.auths
			const hashedPass = await encryptors.hashPass(password)

			// Call DB
			const createArtist = new CreateArtistUsecase(databaseServices)
			const { data, error } = await createArtist.execute({
				data: inputs,
				hashedPass: hashedPass,
			})
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
			const inputs = req.body as ModifyArtistReqDTO

			// Saving Changes
			const modifyArtist = new ModifyArtistUsecase(databaseServices)
			const { data, error } = await modifyArtist.execute(inputs)
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
			const inputs = req.body.id as GetArtistByIdReqDTO

			const getArtistById = new GetArtistByIdUsecase(databaseServices)
			const { data, error } = await getArtistById.execute(inputs)
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
			const inputs = req.params["genre"] as FindArtistsByGenreReqDTO

			const findArtistsByGenre = new FindArtistsByGenreUsecase(databaseServices)
			const { data, error } = await findArtistsByGenre.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}
}
