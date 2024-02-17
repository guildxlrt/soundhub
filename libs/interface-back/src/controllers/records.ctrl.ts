import { RecordsImplement, StorageImplement } from "Infra-backend"
import {
	CreateRecordUsecase,
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
}
