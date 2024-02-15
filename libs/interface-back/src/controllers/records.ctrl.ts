import {
	RecordArtistImplement,
	RecordsImplement,
	SongFeatImplement,
	StorageImplement,
} from "Infra-backend"
import {
	CreateRecordUsecase,
	GetAllRecordsUsecase,
	GetRecordUsecase,
	SetStatusRecordUsecase,
	EditRecordUsecase,
	NewRecordUsecaseParams,
	EditRecordUsecaseParams,
	IDUsecaseParams,
	StorageService,
	RecordsService,
	DeleteRecordUsecase,
	SetStatusRecordUsecaseParams,
	DeleteRecordUsecaseParams,
	SongFeatService,
	RecordArtistService,
	FindRecordsByArtistUsecase,
	FindSongsByArtistFeatsUsecase,
	GenreUsecaseParams,
	FindRecordsByGenreUsecase,
	DateUsecaseParams,
	FindRecordsByDateUsecase,
	RecordTypeUsecaseParams,
	FindRecordsByTypeUsecase,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	EditRecordDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
	StatusDTO,
	PostRecordDTO,
	ItemStatusType,
	GetShortRecordDTO,
	SearchResponseDTO,
} from "Shared"
import { ApiErrorHandler, IRecordsCtrl } from "../assets"

export class RecordsController implements IRecordsCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const authID = req.auth?.authID as number
			const inputs: PostRecordDTO = req.body as PostRecordDTO
			const cover = req.image as unknown
			const params = NewRecordUsecaseParams.fromBackend(inputs, authID, cover)

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const createRecord = new CreateRecordUsecase(recordsService, storageService)
			const { data, error } = await createRecord.execute(params)

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

			const dto: EditRecordDTO = req.body as EditRecordDTO
			const authID = req.auth?.authID as number
			const cover = req.image as unknown
			const params = EditRecordUsecaseParams.fromBackend(dto, authID, cover)

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const editRecord = new EditRecordUsecase(recordsService, storageService)
			const { data, error } = await editRecord.execute(params)

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
			const params = DeleteRecordUsecaseParams.fromBackend(id, authID)

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const deleteRecord = new DeleteRecordUsecase(recordsService, storageService)
			const { data, error } = await deleteRecord.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async setStatus(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PATCH") throw ErrorMsg.htmlError(htmlError[405])

			const authID = req.auth?.authID as number
			const { id, status }: StatusDTO = req.body as StatusDTO
			const params = SetStatusRecordUsecaseParams.fromBackend(
				id,
				status as ItemStatusType,
				authID
			)

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)

			// Calling database
			const setStatusRecord = new SetStatusRecordUsecase(recordsService)
			const { data, error } = await setStatusRecord.execute(params)

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
			const params = IDUsecaseParams.fromBackend(id)

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)

			// Calling database
			const getRecord = new GetRecordUsecase(recordsService)
			const { data, error } = await getRecord.execute(params)

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

			const results: GetShortRecordDTO[] = []
			const errors: ErrorMsg[] = []

			const date = req.query?.["date"] as string
			const artistID = req.query?.["artist-id"] as string
			const genre = req.query?.["genre"] as string
			const feats = req.query?.["feats"] as string
			const recordType = req.query?.["record-type"] as string

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)
			const recordArtistImplement = new RecordArtistImplement()
			const recordArtistService = new RecordArtistService(recordArtistImplement)
			const songFeatImplement = new SongFeatImplement()
			const songFeatService = new SongFeatService(songFeatImplement)

			if (artistID) {
				const params = IDUsecaseParams.fromBackend(artistID)

				// Calling database
				const findRecordsByArtist = new FindRecordsByArtistUsecase(recordArtistService)
				const resultsByArtist = await findRecordsByArtist.execute(params)

				if (resultsByArtist.data) results.push(...resultsByArtist.data)
				if (resultsByArtist.error) errors.push(resultsByArtist.error)
			}
			if (feats) {
				if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

				const id = req.params["id"]
				const params = IDUsecaseParams.fromBackend(id)

				// Calling database
				const findByArtistFeats = new FindSongsByArtistFeatsUsecase(songFeatService)
				const resultsByArtistFeats = await findByArtistFeats.execute(params)

				if (resultsByArtistFeats.data) results.push(...resultsByArtistFeats.data)
				if (resultsByArtistFeats.error) errors.push(resultsByArtistFeats.error)
			}

			if (genre) {
				const params = new GenreUsecaseParams(genre)

				// Calling database
				const findRecordsByGenre = new FindRecordsByGenreUsecase(recordsService)
				const resultsByGenre = await findRecordsByGenre.execute(params)

				if (resultsByGenre.data) results.push(...resultsByGenre.data)
				if (resultsByGenre.error) errors.push(resultsByGenre.error)
			} else if (date) {
				const params = DateUsecaseParams.fromBackend(date)

				// Calling database
				const findEventsByDate = new FindRecordsByDateUsecase(recordsService)
				const resultsByDate = await findEventsByDate.execute(params)

				if (resultsByDate.data) results.push(...resultsByDate.data)
				if (resultsByDate.error) errors.push(resultsByDate.error)
			} else if (recordType) {
				try {
					const params = new RecordTypeUsecaseParams(recordType)

					// Calling database
					const findEventsByDate = new FindRecordsByTypeUsecase(recordsService)
					const { data, error } = await findEventsByDate.execute(params)

					if (error) throw error
					if (!data) throw ErrorMsg.htmlError(htmlError[500])

					const reponse = new ResponseDTO(data, error)
					return res.status(200).send(reponse)
				} catch (error) {
					return ApiErrorHandler.reply(error, res)
				}
			} else if (!date || !genre || !artistID || !feats || !recordType) {
				if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

				// Services
				const recordsImplement = new RecordsImplement()
				const recordsService = new RecordsService(recordsImplement)

				// Calling database
				const getAllRecords = new GetAllRecordsUsecase(recordsService)
				const resultsAll = await getAllRecords.execute()

				if (resultsAll.data) results.push(...resultsAll.data)
				if (resultsAll.error) errors.push(resultsAll.error)
			}

			// RETURN RESULTS
			const reponse = new SearchResponseDTO([...new Set(results)], errors)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
