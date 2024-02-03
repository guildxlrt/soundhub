import { EventsImplement, StorageImplement } from "Infra-backend"
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
	FindEventsByArtistGenreUsecase,
	GenreUsecaseParams,
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
import { ApiErrorHandler, IEventsCtrl } from "../assets"

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

			// Saving Profile
			const createEvent = new CreateEventUsecase(this.eventsService, this.storageService)
			const { data, error } = await createEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const owner = req.auth?.profileID as number
			const file = req.image as StreamFile
			const event = req.body as EditEventDTO
			const params = EditEventUsecaseParams.fromDto(event, owner, file)

			// Saving Changes
			const EditEvent = new EditEventUsecase(this.eventsService, this.storageService)
			const { data, error } = await EditEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
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
			const deleteEvent = new DeleteEventUsecase(this.eventsService, this.storageService)
			const { data, error } = await deleteEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
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
			return new ApiErrorHandler().reply(error, res)
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
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async findMany(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const date = req.query?.["date"] as string
		const artistID = req.query?.["artist"] as string
		const genre = req.query?.["genre"] as string
		const place = req.query?.["place"] as string

		if (artistID) {
			try {
				const params = new IDUsecaseParams(artistID)

				const findEventsByArtist = new FindEventsByArtistUsecase(this.eventsService)
				const { data, error } = await findEventsByArtist.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}
		if (date) {
			try {
				const params = DateUsecaseParams.fromReqParams(date)

				const findEventsByDate = new FindEventsByDateUsecase(this.eventsService)
				const { data, error } = await findEventsByDate.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}
		if (genre) {
			try {
				const params = new PlaceUsecaseParams(genre)

				const findEventsByPlace = new FindEventsByPlaceUsecase(this.eventsService)
				const { data, error } = await findEventsByPlace.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}
		if (place) {
			try {
				const params = new GenreUsecaseParams(place)

				const findEventsByGenre = new FindEventsByArtistGenreUsecase(this.eventsService)
				const { data, error } = await findEventsByGenre.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		return res.status(202).end()
	}
}
