import { IEventsController } from "../assets"
import {
	CreateEventInputDTO,
	DeleteEventInputDTO,
	FindEventsByArtistInputDTO,
	FindEventsByDateInputDTO,
	FindEventsByLocationInputDTO,
	GetEventInputDTO,
} from "Dto"
import {
	CreateEventUsecase,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	FindEventsByLocationUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { ctrlrErrHandler } from "../assets/error-handler"
import { NewEventParams, Event } from "Domain"

export class EventsController implements IEventsController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateEventInputDTO = req.body as CreateEventInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const { date, planner, location, artists, title, text } = inputs
			const eventData = new Event(
				undefined,
				planner,
				date,
				location,
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
			const { data, error } = await deleteEvent.execute(inputs)
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
			const { data, error } = await getEvent.execute(inputs)
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
			const { data, error } = await findEventsByArtist.execute(inputs)
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
			const { data, error } = await findEventsByDate.execute(inputs.date)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}

	async findManyByLocation(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindEventsByLocationInputDTO = req.body as FindEventsByLocationInputDTO
			const findEventsByLocation = new FindEventsByLocationUsecase(databaseServices)
			const { data, error } = await findEventsByLocation.execute(inputs.location)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			ctrlrErrHandler(error, res)
		}
	}
}
