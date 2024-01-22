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
	CreateReleaseReplyDTO,
	CreateReleaseReqDTO,
	FileType,
	FilesArray,
	FindReleasesByArtistReplyDTO,
	FindReleasesByGenreReplyDTO,
	GenreType,
	GetAllReleasesReplyDTO,
	GetReleaseReplyDTO,
	HideReleaseAdapter,
	HideReleaseReplyDTO,
	HideReleaseReqDTO,
	IRelease,
	ModifyReleaseAdapter,
	ModifyReleaseReplyDTO,
	ModifyReleaseReqDTO,
	NewReleaseAdapter,
	apiErrorMsg,
} from "Shared"
import { ApiErrHandler, ApiRequest, ApiReply } from "../../assets"

export class ReleasesController implements IReleasesCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const user = req.auth?.profileID as number
			const img: FileType = req.file
			const audioFiles: FilesArray = req.files as FilesArray
			const inputs: CreateReleaseReqDTO = req.body as CreateReleaseReqDTO

			const { title, releaseType, price, descript, genres } = inputs.release

			const releaseData: IRelease = {
				owner_id: user,
				title: title,
				releaseType: releaseType,
				descript: descript,
				price: price,
				genres: genres,
				coverUrl: null,
			}

			const songsData = inputs.songs
			const songs = songsData.map((song, index) => {
				return {
					data: { title: song.title, featuring: song.featuring, lyrics: song.lyrics },
					audioFile: audioFiles[index],
				}
			})

			// Saving Profile
			const createRelease = new CreateReleaseUsecase(databaseServices)
			const { data, error } = await createRelease.execute(
				new NewReleaseAdapter(
					{
						data: releaseData,
						imgFile: img,
					},
					songs
				)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new CreateReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs: ModifyReleaseReqDTO = req.body as ModifyReleaseReqDTO
			const user = req.auth?.profileID as number
			const img: FileType = req.file

			const { title, releaseType, price, descript, genres } = inputs.release
			const releaseData: IRelease = {
				owner_id: user,
				title: title,
				releaseType: releaseType,
				descript: descript,
				price: price,
				genres: genres,
				coverUrl: null,
			}

			const songsData = inputs.songs
			const songs = songsData.map((song) => {
				return {
					title: song.title,
					featuring: song.featuring,
					lyrics: song.lyrics,
				}
			})

			// Saving Profile
			const modifyRelease = new ModifyReleaseUsecase(databaseServices)
			const { data, error } = await modifyRelease.execute(
				new ModifyReleaseAdapter(
					{
						data: releaseData,
						imgFile: img,
					},
					songs
				)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new ModifyReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async hide(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
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
			return res.status(202).send(new HideReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])
			const getRelease = new GetReleaseUsecase(databaseServices)
			const { data, error } = await getRelease.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const getAllReleases = new GetAllReleasesUsecase(databaseServices)
			const { data, error } = await getAllReleases.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllReleasesReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])
			const findReleasesByArtist = new FindReleasesByArtistUsecase(databaseServices)
			const { data, error } = await findReleasesByArtist.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindReleasesByGenreReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = req.params["genre"] as GenreType
			const findReleasesByGenre = new FindReleasesByGenreUsecase(databaseServices)
			const { data, error } = await findReleasesByGenre.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindReleasesByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
