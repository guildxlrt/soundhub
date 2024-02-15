import { SongsImplement, StorageImplement } from "Infra-backend"
import {
	ExpressRequest,
	ExpressResponse,
	ErrorMsg,
	ResponseDTO,
	htmlError,
	PostSongDTO,
	EditSongDTO,
	GetSongDTO,
	GenreType,
	SearchResponseDTO,
} from "Shared"
import {
	AddSongUsecase,
	AddSongUsecaseParams,
	DeleteSongUsecase,
	DeleteSongUsecaseParams,
	EditSongUsecase,
	EditSongUsecaseParams,
	FindSongsByArtistUsecase,
	FindSongsByRecordGenreUsecase,
	FindSongsByRecordUsecase,
	GenreUsecaseParams,
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

			const authID = req.auth?.authID as number
			const inputs: PostSongDTO = req.body as PostSongDTO
			const audio = req.audio as unknown
			const params = AddSongUsecaseParams.fromBackend(inputs, authID, audio)

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
			const authID = req.auth?.authID as number
			const audio = req.audio as unknown
			const params = EditSongUsecaseParams.fromBackend(dto, authID, audio)

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

			const authID = req.auth?.authID as number
			const id = req.params["id"]
			const params = DeleteSongUsecaseParams.fromBackend(id, authID)

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

	async search(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const artistID = req.query?.["artist-id"] as string
			const recordID = req.query?.["record"] as string
			const recordGenre = req.query?.["record-genre"] as string

			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)

			if (!artistID || !recordID || !recordGenre) throw ErrorMsg.htmlError(htmlError[400])

			const results: GetSongDTO[] = []
			const errors: ErrorMsg[] = []

			if (artistID) {
				const params = IDUsecaseParams.fromBackend(artistID)

				// Calling database
				const getSong = new FindSongsByArtistUsecase(songsService)
				const resultsByArtist = await getSong.execute(params)

				if (resultsByArtist.data) results.push(...resultsByArtist.data)
				if (resultsByArtist.error) errors.push(resultsByArtist.error)
			}

			if (recordID) {
				const params = IDUsecaseParams.fromBackend(recordID)

				// Calling database
				const getSong = new FindSongsByRecordUsecase(songsService)
				const resultsByRecord = await getSong.execute(params)

				if (resultsByRecord.data) results.push(...resultsByRecord.data)
				if (resultsByRecord.error) errors.push(resultsByRecord.error)
			}
			if (recordGenre) {
				if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

				const genre = req.params["genre"] as GenreType
				const params = new GenreUsecaseParams(genre)

				// Calling database
				const getSong = new FindSongsByRecordGenreUsecase(songsService)
				const resultsByGenre = await getSong.execute(params)

				if (resultsByGenre.data) results.push(...resultsByGenre.data)
				if (resultsByGenre.error) errors.push(resultsByGenre.error)
			}

			if (!artistID || !recordID || !recordGenre) throw ErrorMsg.htmlError(htmlError[400])

			// RETURN RESULTS
			const reponse = new SearchResponseDTO([...new Set(results)], errors)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
