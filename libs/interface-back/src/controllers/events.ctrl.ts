import { ApiErrHandler, EventsImplement, StorageImplement } from "Infra-backend"
import {
	CreateEventUsecase,
	DeleteEventUsecaseParams,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	FindEventsByPlaceUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
	EditEventUsecase,
	IDUsecaseParams,
	NewEventUsecaseParams,
	EditEventUsecaseParams,
	StorageService,
	EventsService,
	DateUsecaseParams,
	PlaceUsecaseParams,
} from "Application"
import { StreamFile } from "Domain"
import {
	ExpressRequest,
	ExpressResponse,
	CreateEventDTO,
	EditEventDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
} from "Shared"
import { IEventsCtrl } from "../assets"

export class EventsController implements IEventsCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private eventsImplement = new EventsImplement()
	private eventsService = new EventsService(this.eventsImplement)

	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const owner = req.auth?.profileID as number
			const file = req.image as StreamFile
			const event = req.body as CreateEventDTO
			const params = NewEventUsecaseParams.fromDto(event, owner, file)

			// // Operators
			// // file
			// if (file) validators.file(file, IMAGE_MIME_TYPES)

			// Saving Profile
			const createEvent = new CreateEventUsecase(this.eventsService, this.storageService)
			const { data, error } = await createEvent.execute(params)

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
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const owner = req.auth?.profileID as number
			const file = req.image as StreamFile
			const event = req.body as EditEventDTO
			const params = EditEventUsecaseParams.fromDto(event, owner, file)

			// // Operators
			// // file
			// if (file) validators.file(file, IMAGE_MIME_TYPES)

			// Saving Changes
			const EditEvent = new EditEventUsecase(this.eventsService)
			const { data, error } = await EditEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async delete(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const owner = req.auth?.profileID as number
			const params = DeleteEventUsecaseParams.fromDtoBackend(id, owner)

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteEvent = new DeleteEventUsecase(this.eventsService)
			const { data, error } = await deleteEvent.execute(params)

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

			const getEvent = new GetEventUsecase(this.eventsService)
			const { data, error } = await getEvent.execute(params)

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

			const getAllEvents = new GetAllEventsUsecase(this.eventsService)
			const { data, error } = await getAllEvents.execute()

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

			const findEventsByArtist = new FindEventsByArtistUsecase(this.eventsService)
			const { data, error } = await findEventsByArtist.execute(params)

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

			const findEventsByDate = new FindEventsByDateUsecase(this.eventsService)
			const { data, error } = await findEventsByDate.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByPlace(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const inputs = req.params?.["encoded"]
			const params = new PlaceUsecaseParams(inputs)

			const findEventsByPlace = new FindEventsByPlaceUsecase(this.eventsService)
			const { data, error } = await findEventsByPlace.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
