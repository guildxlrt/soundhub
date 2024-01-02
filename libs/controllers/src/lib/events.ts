import { IEventsController } from "../assets"
import { ApiRequest, ApiReply } from "../assets"
import {
	CreateEventInputDTO,
	DeleteEventInputDTO,
	FindEventsByArtistInputDTO,
	GetEventInputDTO,
} from "Dto"
import {
	CreateEventUsecase,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import { errorMsg } from "Shared-utils"

export class EventsController implements IEventsController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: CreateEventInputDTO = req.body as CreateEventInputDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const createEvent = new CreateEventUsecase(databaseServices)
			const { data, error } = await createEvent.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
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

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(202).send(data)
		} catch (error) {
			//
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetEventInputDTO = req.body as GetEventInputDTO
			const getEvent = new GetEventUsecase(databaseServices)
			const { data, error } = await getEvent.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const getAllEvents = new GetAllEventsUsecase(databaseServices)
			const { data, error } = await getAllEvents.execute()

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: FindEventsByArtistInputDTO = req.body as FindEventsByArtistInputDTO
			const findEventsByArtist = new FindEventsByArtistUsecase(databaseServices)
			const { data, error } = await findEventsByArtist.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}
}
