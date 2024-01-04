import { IEventsController } from "../assets"
import {
	CreateEventInputDTO,
	DeleteEventInputDTO,
	FindEventsByArtistInputDTO,
	FindEventsByDateInputDTO,
	FindEventsByPlaceInputDTO,
	GetEventInputDTO,
} from "Dto"
import {
	CreateEventUsecase,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	FindEventsByPlaceUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { ctrlrErrHandler } from "../assets/error-handler"
import { NewEventParams, Event, IdParams, DateParams, PlaceParams } from "Domain"

export class EventsController implements IEventsController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateEventInputDTO = req.body as CreateEventInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const { date, planner, place, artists, title, text } = inputs
			const eventData = new Event(
				undefined,
				planner,
				date,
				place,
				artists,
				title,
				text,
				undefined
			)

			const createEvent = new CreateEventUsecase(databaseServices)
			const { data, error } = await createEvent.execute(new NewEventParams(eventData))
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: DeleteEventInputDTO = req.body as DeleteEventInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteEvent = new DeleteEventUsecase(databaseServices)
			const { data, error } = await deleteEvent.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetEventInputDTO = req.body as GetEventInputDTO
			const getEvent = new GetEventUsecase(databaseServices)
			const { data, error } = await getEvent.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const getAllEvents = new GetAllEventsUsecase(databaseServices)
			const { data, error } = await getAllEvents.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindEventsByArtistInputDTO = req.body as FindEventsByArtistInputDTO
			const findEventsByArtist = new FindEventsByArtistUsecase(databaseServices)
			const { data, error } = await findEventsByArtist.execute(new IdParams(inputs.id))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByDate(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindEventsByDateInputDTO = req.body as FindEventsByDateInputDTO
			const findEventsByDate = new FindEventsByDateUsecase(databaseServices)
			const { data, error } = await findEventsByDate.execute(new DateParams(inputs.date))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByPlace(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindEventsByPlaceInputDTO = req.body as FindEventsByPlaceInputDTO
			const findEventsByPlace = new FindEventsByPlaceUsecase(databaseServices)
			const { data, error } = await findEventsByPlace.execute(new PlaceParams(inputs.place))
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
