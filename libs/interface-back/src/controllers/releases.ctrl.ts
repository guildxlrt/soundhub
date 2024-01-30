import { ApiErrHandler } from "Infra-backend"
import { Release, Song } from "Domain"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	FindReleasesByGenreUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	SetPrivStatusReleaseUsecase,
	EditReleaseUsecase,
	NewReleaseUsecaseParams,
	EditReleaseUsecaseParams,
	SetPrivStatusReleaseUsecaseParams,
	IDUsecaseParams,
	GenreUsecaseParams,
} from "Application"
import {
	CreateReleaseReplyDTO,
	CreateReleaseReqDTO,
	IFile,
	FilesArray,
	FindReleasesByArtistReplyDTO,
	FindReleasesByGenreReplyDTO,
	GenreType,
	GetAllReleasesReplyDTO,
	GetReleaseReplyDTO,
	SetPrivStatusReleaseReplyDTO,
	SetPrivStatusReleaseReqDTO,
	EditReleaseReplyDTO,
	EditReleaseReqDTO,
	htmlError,
	formatters,
	IMAGE_MIME_TYPES,
	validators,
	AUDIO_MIME_TYPES,
	ApiRes,
	ApiRequest,
} from "Shared"
import { IReleasesCtrl } from "../assets"

export class ReleasesController implements IReleasesCtrl {
	async create(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST")
				return res.status(405).send({ error: htmlError[405].message })

			const user = req.auth?.profileID as number
			const inputs: CreateReleaseReqDTO = req.body as CreateReleaseReqDTO
			const cover: IFile = req.image as IFile
			const audioFiles: FilesArray = req.songs as FilesArray

			const { title, releaseType, price, descript, genres } = inputs.release

			const releaseData = new Release(
				null,
				user,
				title,
				releaseType,
				descript,
				price,
				genres,
				null
			)

			const songsData = inputs.songs
			const songs = songsData.map((song, index) => {
				return {
					data: new Song(null, null, null, song.title, song.featuring, song.lyrics),
					audio: audioFiles[index],
				}
			})

			// OPERATORS
			// genres
			const cleanGenres = formatters.genres(genres)
			releaseData.setGenres(cleanGenres)
			// cover
			if (cover) validators.file(cover, IMAGE_MIME_TYPES)
			songs.forEach((song) => {
				if (song.audio) validators.file(song.audio, AUDIO_MIME_TYPES)
			})

			// Saving Profile
			const createRelease = new CreateReleaseUsecase(databaseRepos)
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

	async edit(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "DELETE")
				return res.status(405).send({ error: htmlError[405].message })

			const inputs: EditReleaseReqDTO = req.body as EditReleaseReqDTO
			const user = req.auth?.profileID as number
			const cover: IFile = req.image as IFile

			const { title, releaseType, price, descript, genres, id, coverPath } = inputs.release
			const releaseData = new Release(
				id,
				user,
				title,
				releaseType,
				descript,
				price,
				genres,
				coverPath
			)

			const songsData = inputs.songs
			const songs = songsData.map((song) => {
				return new Song(song.id, id, null, song.title, song.featuring, song.lyrics)
			})

			// OPERATORS
			// genres
			const cleanGenres = formatters.genres(genres)
			releaseData.setGenres(cleanGenres)

			// Saving Profile
			const editRelease = new EditReleaseUsecase(databaseRepos)
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

	async setPrivStatus(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PATCH")
				return res.status(405).send({ error: htmlError[405].message })

			const user = req.auth?.profileID
			const { id, isPublic }: SetPrivStatusReleaseReqDTO =
				req.body as SetPrivStatusReleaseReqDTO

			// Saving Profile
			const setPrivStatusRelease = new SetPrivStatusReleaseUsecase(databaseRepos)
			const { data, error } = await setPrivStatusRelease.execute(
				new SetPrivStatusReleaseUsecaseParams(id, isPublic, user)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new SetPrivStatusReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const getRelease = new GetReleaseUsecase(databaseRepos)
			const { data, error } = await getRelease.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetReleaseReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const getAllReleases = new GetAllReleasesUsecase(databaseRepos)
			const { data, error } = await getAllReleases.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllReleasesReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const findReleasesByArtist = new FindReleasesByArtistUsecase(databaseRepos)
			const { data, error } = await findReleasesByArtist.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindReleasesByGenreReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const genre = req.params["genre"] as GenreType
			const findReleasesByGenre = new FindReleasesByGenreUsecase(databaseRepos)
			const { data, error } = await findReleasesByGenre.execute(new GenreUsecaseParams(genre))
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindReleasesByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
