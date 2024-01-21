import { IReleasesCtrl } from "../../assets"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	FindReleasesByGenreUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	HideReleaseUsecase,
	ModifyReleaseUsecase,
} from "Domain"
import { databaseServices } from "Infra-backend"
import {
	CreateReleaseReqDTO,
	GenreType,
	HideReleaseAdapter,
	HideReleaseReqDTO,
	IRelease,
	ModifyReleaseAdapter,
	ModifyReleaseReqDTO,
	NewReleaseAdapter,
	apiErrorMsg,
} from "Shared"
import { errHandler, ApiRequest, ApiReply } from "../../assets"

export class ReleasesController implements IReleasesCtrl {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const user = req.auth?.profileID as number

			const inputs: CreateReleaseReqDTO = req.body as CreateReleaseReqDTO

			const { title, releaseType, price, descript, genres } = inputs.release
			const release: IRelease = {
				owner_id: user,
				title: title,
				releaseType: releaseType,
				descript: descript,
				price: price,
				genres: genres,
				coverUrl: null,
			}
			const { songs } = inputs

			// Saving Profile
			const createRelease = new CreateReleaseUsecase(databaseServices)
			const { data, error } = await createRelease.execute(
				new NewReleaseAdapter(release, songs, undefined)
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
			const inputs: ModifyReleaseReqDTO = req.body as ModifyReleaseReqDTO
			const user = req.auth?.profileID as number

			const { title, releaseType, price, descript, genres } = inputs.release
			const release: IRelease = {
				owner_id: user,
				title: title,
				releaseType: releaseType,
				descript: descript,
				price: price,
				genres: genres,
				coverUrl: null,
			}
			const { songs } = inputs

			// Saving Profile
			const modifyRelease = new ModifyReleaseUsecase(databaseServices)
			const { data, error } = await modifyRelease.execute(
				new ModifyReleaseAdapter(release, songs)
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
			const user = req.auth?.profileID
			const { id, isPublic }: HideReleaseReqDTO = req.body as HideReleaseReqDTO

			// Saving Profile
			const hideRelease = new HideReleaseUsecase(databaseServices)
			const { data, error } = await hideRelease.execute(
				new HideReleaseAdapter(id, isPublic, user)
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
