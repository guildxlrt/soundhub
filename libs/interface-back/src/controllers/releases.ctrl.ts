import { ReleasesImplement, SongsImplement, StorageImplement } from "Infra-backend"
import { StreamFile } from "Domain"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	SetPublicStatusReleaseUsecase,
	EditReleaseUsecase,
	NewReleaseUsecaseParams,
	EditReleaseUsecaseParams,
	SetPublicStatusReleaseUsecaseParams,
	IDUsecaseParams,
	GenreUsecaseParams,
	StorageService,
	ReleasesService,
	DateUsecaseParams,
	FindReleasesByDateUsecase,
	FindReleasesByGenreUsecase,
	SongsService,
	FindReleasesByTypeUsecase,
	FindReleasesByArtistFeatsUsecase,
	ReleaseTypeUsecaseParams,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	EditReleaseDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
	ReleaseStatusDTO,
	PostReleaseDTO,
} from "Shared"
import { ApiErrorHandler, IReleasesCtrl } from "../assets"

export class ReleasesController implements IReleasesCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const inputs: PostReleaseDTO = req.body as PostReleaseDTO
			const cover = req.image as StreamFile
			const audioFiles: StreamFile[] = req.songs as StreamFile[]
			const params = NewReleaseUsecaseParams.fromDto(inputs, user, audioFiles, cover)

			// Services
			const releasesImplement = new ReleasesImplement()
			const releasesService = new ReleasesService(releasesImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const createRelease = new CreateReleaseUsecase(releasesService, storageService)
			const { data, error } = await createRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const inputs: EditReleaseDTO = req.body as EditReleaseDTO
			const user = req.auth?.profileID as number
			const cover = req.image as StreamFile
			const params = EditReleaseUsecaseParams.fromDto(inputs, user, cover)

			// Services
			const releasesImplement = new ReleasesImplement()
			const releasesService = new ReleasesService(releasesImplement)
			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const editRelease = new EditReleaseUsecase(
				releasesService,
				storageService,
				songsService
			)
			const { data, error } = await editRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async setPublicStatus(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PATCH") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const { id }: ReleaseStatusDTO = req.body as ReleaseStatusDTO
			const params = SetPublicStatusReleaseUsecaseParams.fromDtoBackend(id, user)

			// Services
			const releasesImplement = new ReleasesImplement()
			const releasesService = new ReleasesService(releasesImplement)

			// Calling database
			const setPublicStatusRelease = new SetPublicStatusReleaseUsecase(releasesService)
			const { data, error } = await setPublicStatusRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			// Services
			const releasesImplement = new ReleasesImplement()
			const releasesService = new ReleasesService(releasesImplement)

			// Calling database
			const getRelease = new GetReleaseUsecase(releasesService)
			const { data, error } = await getRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			// Services
			const releasesImplement = new ReleasesImplement()
			const releasesService = new ReleasesService(releasesImplement)

			// Calling database
			const getAllReleases = new GetAllReleasesUsecase(releasesService)
			const { data, error } = await getAllReleases.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
	async findMany(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const artistID = req.query?.["artist"] as string
		const owner = req.query?.["owner"] as string
		const feats = req.query?.["feats"] as string
		const genre = req.query?.["genre"] as string
		const date = req.query?.["date"] as string
		const releaseType = req.query?.["release-type"] as string

		// Services
		const releasesImplement = new ReleasesImplement()
		const releasesService = new ReleasesService(releasesImplement)

		if (artistID) {
			if (owner) {
				try {
					const params = new IDUsecaseParams(artistID)

					// Calling database
					const findReleasesByArtist = new FindReleasesByArtistUsecase(releasesService)
					const { data, error } = await findReleasesByArtist.execute(params)

					if (error) throw error
					if (!data) throw ErrorMsg.htmlError(htmlError[500])

					const reponse = new ResponseDTO(data, error)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}
			}
			if (feats) {
				try {
					if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

					const id = req.params["id"]
					const params = new IDUsecaseParams(id)

					// Calling database
					const findManyByArtistFeats = new FindReleasesByArtistFeatsUsecase(
						releasesService
					)
					const { data, error } = await findManyByArtistFeats.execute(params)

					if (error) throw error
					if (!data) throw ErrorMsg.htmlError(htmlError[500])

					const reponse = new ResponseDTO(data, error)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}
			}
		}
		if (genre) {
			try {
				const params = new GenreUsecaseParams(genre)

				// Calling database
				const findReleasesByGenre = new FindReleasesByGenreUsecase(releasesService)
				const { data, error } = await findReleasesByGenre.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}

		if (date) {
			try {
				const params = DateUsecaseParams.fromReqParams(date)

				// Calling database
				const findEventsByDate = new FindReleasesByDateUsecase(releasesService)
				const { data, error } = await findEventsByDate.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}

		if (releaseType) {
			try {
				if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

				const inputs = req.params?.["type"]
				const params = ReleaseTypeUsecaseParams.fromReqParams(inputs)

				// Calling database
				const findEventsByDate = new FindReleasesByTypeUsecase(releasesService)
				const { data, error } = await findEventsByDate.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}

		return res.status(202).end()
	}
}
