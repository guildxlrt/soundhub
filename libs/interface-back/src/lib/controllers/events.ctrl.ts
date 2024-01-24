import { ApiErrHandler, ApiRequest, ApiReply, databaseServices } from "Infra-backend"
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
	EventUsecaseParams,
	IDUsecaseParams,
	Event,
} from "Domain"
import {
	CreateEventReplyDTO,
	CreateEventReqDTO,
	DeleteEventReplyDTO,
	FileType,
	FindEventsByArtistReplyDTO,
	FindEventsByDateReplyDTO,
	FindEventsByDateReqDTO,
	FindEventsByPlaceReplyDTO,
	FindEventsByPlaceReqDTO,
	GetAllEventsReplyDTO,
	GetEventReplyDTO,
	EditEventReplyDTO,
	EditEventReqDTO,
	apiError,
	validators,
	IMAGE_MIME_TYPES,
} from "Shared"
import { IEventsCtrl } from "../../assets"

export class EventsController implements IEventsCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiError[405].message })

			const owner = req.auth?.profileID
			const file: FileType = req.file as FileType
			const { artists, date, place, text, title }: CreateEventReqDTO =
				req.body as CreateEventReqDTO
			// Operators
			// file
			if (file) validators.file(file, IMAGE_MIME_TYPES, true)

			const event = new Event(null, owner as number, date, place, artists, title, text, null)

			// Saving Profile
			const createEvent = new CreateEventUsecase(databaseServices, true)
			const { data, error } = await createEvent.execute(new EventUsecaseParams(event, file))
			if (error) throw error

			// Return infos
			return res.status(202).send(new CreateEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async edit(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: apiError[405].message })

			const owner = req.auth?.profileID as number
			const file: FileType = req.file as FileType
			const { artists, date, place, text, title, id, imagePath }: EditEventReqDTO =
				req.body as EditEventReqDTO

			// Operators
			// file
			if (file) validators.file(file, IMAGE_MIME_TYPES, true)

			const event = new Event(
				id,
				owner as number,
				date,
				place,
				artists,
				title,
				text,
				imagePath
			)

			// Saving Changes
			const EditEvent = new EditEventUsecase(databaseServices, true)
			const { data, error } = await EditEvent.execute(new EventUsecaseParams(event, file))
			if (error) throw error

			// Return infos
			return res.status(202).send(new EditEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "DELETE")
				return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])
			const owner = req.auth?.profileID as number

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteEvent = new DeleteEventUsecase(databaseServices, true)
			const { data, error } = await deleteEvent.execute(
				new DeleteEventUsecaseParams(id, owner)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(new DeleteEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])

			const getEvent = new GetEventUsecase(databaseServices, true)
			const { data, error } = await getEvent.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const getAllEvents = new GetAllEventsUsecase(databaseServices, true)
			const { data, error } = await getAllEvents.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllEventsReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const id = Number(req.params["id"])
			const findEventsByArtist = new FindEventsByArtistUsecase(databaseServices, true)
			const { data, error } = await findEventsByArtist.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindEventsByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByDate(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const inputs: FindEventsByDateReqDTO = req.body as FindEventsByDateReqDTO
			const findEventsByDate = new FindEventsByDateUsecase(databaseServices, true)
			const { data, error } = await findEventsByDate.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindEventsByDateReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByPlace(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiError[405].message })

			const inputs: FindEventsByPlaceReqDTO = req.body as FindEventsByPlaceReqDTO
			const findEventsByPlace = new FindEventsByPlaceUsecase(databaseServices, true)
			const { data, error } = await findEventsByPlace.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindEventsByPlaceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
