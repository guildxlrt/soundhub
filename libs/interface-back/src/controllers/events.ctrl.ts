import { ApiErrHandler, ApiRequest, ApiRes, EventsImplement, StorageImplement } from "Infra-backend"
import {
	CreateEventUsecase,
	DeleteEventParamsAdapter,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	FindEventsByPlaceUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
	EditEventUsecase,
	IDParamsAdapter,
	NewEventParamsAdapter,
	EditEventParamsAdapter,
	StorageService,
	EventsService,
	DateParamsAdapter,
	PlaceParamsAdapter,
} from "Application"
import { File } from "Domain"
import { CreateEventDTO, EditEventDTO, htmlError, ErrorMsg, ReplyDTO } from "Shared"
import { IEventsCtrl } from "../assets"

export class EventsController implements IEventsCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private eventsImplement = new EventsImplement()
	private eventsService = new EventsService(this.eventsImplement)

	async create(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const owner = req.auth?.profileID as number
			const file = req.image as File
			const event = req.body as CreateEventDTO
			const params = NewEventParamsAdapter.fromDto(event, owner, file)

			// // Operators
			// // file
			// if (file) validators.file(file, IMAGE_MIME_TYPES)

			// Saving Profile
			const createEvent = new CreateEventUsecase(this.eventsService, this.storageService)
			const { data, error } = await createEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async edit(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const owner = req.auth?.profileID as number
			const file = req.image as File
			const event = req.body as EditEventDTO
			const params = EditEventParamsAdapter.fromDto(event, owner, file)

			// // Operators
			// // file
			// if (file) validators.file(file, IMAGE_MIME_TYPES)

			// Saving Changes
			const EditEvent = new EditEventUsecase(this.eventsService)
			const { data, error } = await EditEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const owner = req.auth?.profileID as number
			const params = DeleteEventParamsAdapter.fromDtoBackend(id, owner)

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteEvent = new DeleteEventUsecase(this.eventsService)
			const { data, error } = await deleteEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const params = new IDParamsAdapter(id)

			const getEvent = new GetEventUsecase(this.eventsService)
			const { data, error } = await getEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const getAllEvents = new GetAllEventsUsecase(this.eventsService)
			const { data, error } = await getAllEvents.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const params = new IDParamsAdapter(id)

			const findEventsByArtist = new FindEventsByArtistUsecase(this.eventsService)
			const { data, error } = await findEventsByArtist.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByDate(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const inputs = req.params?.["encoded"]
			const params = DateParamsAdapter.fromDto(inputs)

			const findEventsByDate = new FindEventsByDateUsecase(this.eventsService)
			const { data, error } = await findEventsByDate.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByPlace(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const inputs = req.params?.["encoded"]
			const params = new PlaceParamsAdapter(inputs)

			const findEventsByPlace = new FindEventsByPlaceUsecase(this.eventsService)
			const { data, error } = await findEventsByPlace.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
