import { ReleasesImplement, SongsImplement, StorageImplement } from "Infra-backend"
import {
	CreateReleaseUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	SetPublicStatusReleaseUsecase,
	EditReleaseUsecase,
	NewReleaseUsecaseParams,
	EditReleaseUsecaseParams,
	SetPublicStatusReleaseUsecaseParams,
	IDUsecaseParams,
	StorageService,
	ReleasesService,
	SongsService,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	EditReleaseDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
	StatusDTO,
	PostReleaseDTO,
} from "Shared"
import { ApiErrorHandler, IReleasesCtrl } from "../assets"

export class ReleasesController implements IReleasesCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.ArtistProfileID as number
			const inputs: PostReleaseDTO = req.body as PostReleaseDTO
			const cover = req.image as unknown
			const audioFiles: unknown[] = req.songs as unknown[]
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
			const user = req.auth?.ArtistProfileID as number
			const cover = req.image as unknown
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

			const user = req.auth?.ArtistProfileID as number
			const { id }: StatusDTO = req.body as StatusDTO
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
}
