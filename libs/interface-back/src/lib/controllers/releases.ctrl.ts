import { IReleasesController } from "../../assets"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	FindReleasesByGenreUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	HideReleaseUsecase,
	ModifyReleaseUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import {
	CreateReleaseReqDTO,
	GenreType,
	HideReleaseParams,
	HideReleaseReqDTO,
	ModifyReleaseParams,
	ModifyReleaseReqDTO,
	NewReleaseParams,
	apiErrorMsg,
} from "Shared"
import { errHandler, ApiRequest, ApiReply } from "../../assets"

export class ReleasesController implements IReleasesController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const user = req.auth?.artistId as number

			const { release, songs }: CreateReleaseReqDTO = req.body as CreateReleaseReqDTO

			release.artist_id = user
			// Saving Profile
			const createRelease = new CreateReleaseUsecase(databaseServices)
			const { data, error } = await createRelease.execute(
				new NewReleaseParams(release, songs, undefined)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const { id, newAmount }: ModifyReleaseReqDTO = req.body as ModifyReleaseReqDTO
			const user = req.auth?.artistId

			// Saving Profile
			const modifyRelease = new ModifyReleaseUsecase(databaseServices)
			const { data, error } = await modifyRelease.execute(
				new ModifyReleaseParams(id, newAmount, user)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async hide(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PATCH") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const user = req.auth?.artistId
			const { id, isPublic }: HideReleaseReqDTO = req.body as HideReleaseReqDTO

			// Saving Profile
			const hideRelease = new HideReleaseUsecase(databaseServices)
			const { data, error } = await hideRelease.execute(
				new HideReleaseParams(id, isPublic, user)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])
			const getRelease = new GetReleaseUsecase(databaseServices)
			const { data, error } = await getRelease.execute(id)
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
			const getAllReleases = new GetAllReleasesUsecase(databaseServices)
			const { data, error } = await getAllReleases.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])
			const findReleasesByArtist = new FindReleasesByArtistUsecase(databaseServices)
			const { data, error } = await findReleasesByArtist.execute(id)
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
			const id = req.params["genre"] as GenreType
			const findReleasesByGenre = new FindReleasesByGenreUsecase(databaseServices)
			const { data, error } = await findReleasesByGenre.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}
}
