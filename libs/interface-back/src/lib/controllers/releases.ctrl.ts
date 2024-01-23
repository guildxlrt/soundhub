import { databaseServices } from "Infra-backend"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	FindReleasesByGenreUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	HideReleaseUsecase,
	EditReleaseUsecase,
	NewReleaseUsecaseParams,
	EditReleaseUsecaseParams,
	HideReleaseUsecaseParams,
	IDUsecaseParams,
	GenreUsecaseParams,
} from "Domain"
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
	HideReleaseReplyDTO,
	HideReleaseReqDTO,
	IRelease,
	EditReleaseReplyDTO,
	EditReleaseReqDTO,
	apiError,
} from "Shared"
import { IReleasesCtrl, ApiErrHandler, ApiRequest, ApiReply } from "../../assets"

export class ReleasesController implements IReleasesCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiError[405].message })

			const user = req.auth?.profileID as number
			const cover: FileType = req.file as FileType
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
			const createRelease = new CreateReleaseUsecase(databaseServices, true)
			const { data, error } = await createRelease.execute(
				new NewReleaseUsecaseParams(
					{
						data: releaseData,
						cover: cover,
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

	async edit(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "DELETE")
				return res.status(405).send({ error: apiError[405].message })

			const inputs: EditReleaseReqDTO = req.body as EditReleaseReqDTO
			const user = req.auth?.profileID as number
			const cover: FileType = req.file as FileType

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
			const editRelease = new EditReleaseUsecase(databaseServices, true)
			const { data, error } = await editRelease.execute(
				new EditReleaseUsecaseParams(
					{
						data: releaseData,
						cover: cover,
					},
					songs
				)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new EditReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async hide(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PATCH")
				return res.status(405).send({ error: apiError[405].message })

			const user = req.auth?.profileID
			const { id, isPublic }: HideReleaseReqDTO = req.body as HideReleaseReqDTO

			// Saving Profile
			const hideRelease = new HideReleaseUsecase(databaseServices, true)
			const { data, error } = await hideRelease.execute(
				new HideReleaseUsecaseParams(id, isPublic, user)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new HideReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])
			const getRelease = new GetReleaseUsecase(databaseServices, true)
			const { data, error } = await getRelease.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const getAllReleases = new GetAllReleasesUsecase(databaseServices, true)
			const { data, error } = await getAllReleases.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllReleasesReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])
			const findReleasesByArtist = new FindReleasesByArtistUsecase(databaseServices, true)
			const { data, error } = await findReleasesByArtist.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindReleasesByGenreReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const genre = req.params["genre"] as GenreType
			const findReleasesByGenre = new FindReleasesByGenreUsecase(databaseServices, true)
			const { data, error } = await findReleasesByGenre.execute(new GenreUsecaseParams(genre))
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindReleasesByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
