import { SongsImplement, StorageImplement } from "Infra-backend"
import {
	ExpressRequest,
	ExpressResponse,
	ErrorMsg,
	ResponseDTO,
	htmlError,
	PostSongDTO,
	EditSongDTO,
} from "Shared"
import {
	AddSongUsecase,
	AddSongUsecaseParams,
	DeleteSongUsecase,
	DeleteSongUsecaseParams,
	EditSongUsecase,
	EditSongUsecaseParams,
	GetSongUsecase,
	IDUsecaseParams,
	SongsService,
	StorageService,
} from "Application"
import { ApiErrorHandler, ISongsCtrl } from "../assets"

export class SongsController implements ISongsCtrl {
	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = IDUsecaseParams.fromBackend(id)

			// services
			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)

			// Calling database
			const getSong = new GetSongUsecase(songsService)
			const { data, error } = await getSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async add(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const publisher = req.auth?.authID as number
			const inputs: PostSongDTO = req.body as PostSongDTO
			const audio = req.audio as unknown
			const params = AddSongUsecaseParams.fromBackend(inputs, publisher, audio)

			// Services
			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const createSong = new AddSongUsecase(songsService, storageService)
			const { data, error } = await createSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(201).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto: EditSongDTO = req.body as EditSongDTO
			const publisher = req.auth?.authID as number
			const audio = req.audio as unknown
			const params = EditSongUsecaseParams.fromBackend(dto, publisher, audio)

			// Services
			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const editSong = new EditSongUsecase(songsService, storageService)
			const { data, error } = await editSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async delete(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const publisher = req.auth?.authID as number
			const id = req.params["id"]
			const params = DeleteSongUsecaseParams.fromBackend(id, publisher)

			// Services
			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const deleteSong = new DeleteSongUsecase(songsService, storageService)
			const { data, error } = await deleteSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
