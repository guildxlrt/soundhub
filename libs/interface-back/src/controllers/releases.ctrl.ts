import {
	ApiErrHandler,
	ApiRequest,
	ApiRes,
	ReleasesImplement,
	StorageImplement,
} from "Infra-backend"
import { File, Release, Song } from "Domain"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	FindReleasesByGenreUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	SetPrivStatusReleaseUsecase,
	EditReleaseUsecase,
	NewReleaseParamsAdapter,
	EditReleaseParamsAdapter,
	SetPrivStatusReleaseParamsAdapter,
	IDParamsAdapter,
	GenreParamsAdapter,
	StorageService,
	ReleasesService,
} from "Application"
import {
	GenreType,
	EditReleaseDTO,
	htmlError,
	formatters,
	IMAGE_MIME_TYPES,
	validators,
	AUDIO_MIME_TYPES,
	ErrorMsg,
	ReplyDTO,
	ReleaseStatusDTO,
} from "Shared"
import { IReleasesCtrl } from "../assets"

export class ReleasesController implements IReleasesCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private releasesImplement = new ReleasesImplement()
	private releasesService = new ReleasesService(this.releasesImplement)

	async create(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST")
				return res.status(405).send({ error: htmlError[405].message })

			const user = req.auth?.profileID as number
			const inputs: PostReleaseDTO = req.body as PostReleaseDTO
			const cover = req.image as File
			const audioFiles: File[] = req.songs as File[]

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
			const createRelease = new CreateReleaseUsecase(this.releasesService)
			const { data, error } = await createRelease.execute(
				new NewReleaseParamsAdapter(
					{
						data: releaseData,
						cover: cover,
					},
					songs
				)
			)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(202).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async edit(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "DELETE")
				return res.status(405).send({ error: htmlError[405].message })

			const inputs: EditReleaseDTO = req.body as EditReleaseDTO
			const user = req.auth?.profileID as number
			const cover = req.image as File

			const { title, price, descript, genres, id } = inputs.release
			const releaseData = new Release(id, user, title, null, descript, price, genres, null)

			const songsData = inputs.songs
			const songs = songsData.map((song) => {
				return new Song(song.id, id, null, song.title, song.featuring, song.lyrics)
			})

			// OPERATORS
			// genres
			const cleanGenres = formatters.genres(genres)
			releaseData.setGenres(cleanGenres)

			// Saving Profile
			const editRelease = new EditReleaseUsecase(this.releasesService)
			const { data, error } = await editRelease.execute(
				new EditReleaseParamsAdapter(
					{
						data: releaseData,
						cover: cover,
					},
					songs
				)
			)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(202).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async setPrivStatus(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PATCH")
				return res.status(405).send({ error: htmlError[405].message })

			const user = req.auth?.profileID
			const { id, isPublic }: ReleaseStatusDTO = req.body as ReleaseStatusDTO

			// Saving Profile
			const setPrivStatusRelease = new SetPrivStatusReleaseUsecase(this.releasesService)
			const { data, error } = await setPrivStatusRelease.execute(
				new SetPrivStatusReleaseParamsAdapter(id, isPublic, user)
			)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(202).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const getRelease = new GetReleaseUsecase(this.releasesService)
			const { data, error } = await getRelease.execute(new IDParamsAdapter(id))
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const getAllReleases = new GetAllReleasesUsecase(this.releasesService)
			const { data, error } = await getAllReleases.execute()
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const findReleasesByArtist = new FindReleasesByArtistUsecase(this.releasesService)
			const { data, error } = await findReleasesByArtist.execute(new IDParamsAdapter(id))
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByGenre(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const genre = req.params["genre"] as GenreType
			const findReleasesByGenre = new FindReleasesByGenreUsecase(this.releasesService)
			const { data, error } = await findReleasesByGenre.execute(new GenreParamsAdapter(genre))
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new ReplyDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
