import { ApiErrHandler, ReleasesImplement, StorageImplement } from "Infra-backend"
import { StreamFile } from "Domain"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	SetPrivStatusReleaseUsecase,
	EditReleaseUsecase,
	NewReleaseUsecaseParams,
	EditReleaseUsecaseParams,
	SetPrivStatusReleaseUsecaseParams,
	IDUsecaseParams,
	GenreUsecaseParams,
	StorageService,
	ReleasesService,
	DateUsecaseParams,
	FindReleasesByDateUsecase,
	FindReleasesByGenreUsecase,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	GenreType,
	EditReleaseDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
	ReleaseStatusDTO,
	PostReleaseDTO,
} from "Shared"
import { IReleasesCtrl } from "../assets"

export class ReleasesController implements IReleasesCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private releasesImplement = new ReleasesImplement()
	private releasesService = new ReleasesService(this.releasesImplement)

	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const inputs: PostReleaseDTO = req.body as PostReleaseDTO
			const cover = req.image as StreamFile
			const audioFiles: StreamFile[] = req.songs as StreamFile[]
			const params = NewReleaseUsecaseParams.fromDto(inputs, user, audioFiles, cover)

			// // OPERATORS
			// // genres
			// const cleanGenres = formatters.genres(genres)
			// releaseData.setGenres(cleanGenres)
			// // cover
			// if (cover) validators.file(cover, IMAGE_MIME_TYPES)
			// songs.forEach((song) => {
			// 	if (song.audio) validators.file(song.audio, AUDIO_MIME_TYPES)
			// })

			// Saving Profile
			const createRelease = new CreateReleaseUsecase(
				this.releasesService,
				this.storageService
			)
			const { data, error } = await createRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const inputs: EditReleaseDTO = req.body as EditReleaseDTO
			const user = req.auth?.profileID as number
			const cover = req.image as StreamFile
			const params = EditReleaseUsecaseParams.fromDto(inputs, user, cover)

			// // OPERATORS
			// // genres
			// const cleanGenres = formatters.genres(genres)
			// releaseData.setGenres(cleanGenres)

			// Saving Profile
			const editRelease = new EditReleaseUsecase(this.releasesService)
			const { data, error } = await editRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async setPrivStatus(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PATCH") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const { id }: ReleaseStatusDTO = req.body as ReleaseStatusDTO
			const params = SetPrivStatusReleaseUsecaseParams.fromDtoBackend(id, user)

			// Saving Profile
			const setPrivStatusRelease = new SetPrivStatusReleaseUsecase(this.releasesService)
			const { data, error } = await setPrivStatusRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			const getRelease = new GetReleaseUsecase(this.releasesService)
			const { data, error } = await getRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const getAllReleases = new GetAllReleasesUsecase(this.releasesService)
			const { data, error } = await getAllReleases.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByArtist(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			const findReleasesByArtist = new FindReleasesByArtistUsecase(this.releasesService)
			const { data, error } = await findReleasesByArtist.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByGenre(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const genre = req.params["genre"] as GenreType
			const params = new GenreUsecaseParams(genre)

			const findReleasesByGenre = new FindReleasesByGenreUsecase(this.releasesService)
			const { data, error } = await findReleasesByGenre.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByDate(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const inputs = req.params?.["encoded"]
			const params = DateUsecaseParams.fromDto(inputs)

			const findEventsByDate = new FindReleasesByDateUsecase(this.releasesService)
			const { data, error } = await findEventsByDate.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
