import { RecordsImplement, StorageImplement } from "Infra-backend"
import {
	CreateRecordUsecase,
	GetAllRecordsUsecase,
	GetRecordUsecase,
	SetPublicStatusRecordUsecase,
	EditRecordUsecase,
	NewRecordUsecaseParams,
	EditRecordUsecaseParams,
	PatchDeleteUsecaseParams,
	IDUsecaseParams,
	StorageService,
	RecordsService,
	PublishRecordUsecase,
	DeleteRecordUsecase,
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
} from "Shared"
import { ApiErrorHandler, IRecordsCtrl } from "../assets"

export class RecordsController implements IRecordsCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const publisher = req.auth?.authID as number
			const inputs: PostRecordDTO = req.body as PostRecordDTO
			const cover = req.image as unknown
			const params = NewRecordUsecaseParams.fromBackend(inputs, publisher, cover)

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
			const publisher = req.auth?.authID as number
			const cover = req.image as unknown
			const params = EditRecordUsecaseParams.fromBackend(dto, publisher, cover)

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

			const publisher = req.auth?.authID as number
			const id = req.params["id"]
			const params = PatchDeleteUsecaseParams.fromBackend(id, publisher)

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

	async publish(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PATCH") throw ErrorMsg.htmlError(htmlError[405])

			const publisher = req.auth?.authID as number
			const id = req.params["id"]
			const params = PatchDeleteUsecaseParams.fromBackend(id, publisher)

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)

			// Calling database
			const publishRecord = new PublishRecordUsecase(recordsService)
			const { data, error } = await publishRecord.execute(params)

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

			const publisher = req.auth?.authID as number
			const { id }: StatusDTO = req.body as StatusDTO
			const params = PatchDeleteUsecaseParams.fromBackend(id, publisher)

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)

			// Calling database
			const setPublicStatusRecord = new SetPublicStatusRecordUsecase(recordsService)
			const { data, error } = await setPublicStatusRecord.execute(params)

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

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			// Services
			const recordsImplement = new RecordsImplement()
			const recordsService = new RecordsService(recordsImplement)

			// Calling database
			const getAllRecords = new GetAllRecordsUsecase(recordsService)
			const { data, error } = await getAllRecords.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
