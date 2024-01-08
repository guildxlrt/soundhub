import { Reply, dbClient } from "../../assets"
import {
	DateParams,
	ErrorMsg,
	EventsRepository,
	IEventSucc,
	IEventsListItemSucc,
	IEventsListSucc,
	IdParams,
	ModifyEventParams,
	NewEventParams,
	PlaceParams,
} from "Shared"

export class EventsImplement implements EventsRepository {
	async create(inputs: NewEventParams): Promise<Reply<boolean>> {
		const { planner, date, place, artists, title, text, imageUrl } = inputs.data

		try {
			// Storing files
			// ...

			await dbClient.event.create({
				data: {
					planner: planner as number,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
					imageUrl: imageUrl,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(
				false,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			return res
		}
	}

	async modify(inputs: ModifyEventParams): Promise<Reply<boolean>> {
		const { id, planner, date, place, artists, title, text, imageUrl } = inputs.data

		try {
			// Storing files
			await dbClient.event.update({
				where: {
					id: id,
				},
				data: {
					planner: planner,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
					imageUrl: imageUrl,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(
				false,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			return res
		}
	}

	async delete(inputs: IdParams): Promise<Reply<void>> {
		const id = inputs.id

		try {
			await dbClient.event.delete({
				where: {
					id: id,
				},
			})

			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(
				undefined,
				new ErrorMsg(500, `Error: failed to delete`, error)
			)

			return res
		}
	}

	async get(inputs: IdParams): Promise<Reply<IEventSucc>> {
		const id = inputs.id

		try {
			const data = await dbClient.event.findUnique({
				where: {
					id: id,
				},
				select: {
					id: true,
					planner: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					text: true,
					imageUrl: true,
				},
			})

			// Response
			return new Reply<IEventSucc>({
				id: data?.id,
				planner: data?.planner,
				date: data?.date,
				place: data?.place,
				artists: data?.artists,
				title: data?.title,
				text: data?.text,
				imageUrl: data?.imageUrl,
			})
		} catch (error) {
			return new Reply<IEventSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async getAll(): Promise<Reply<IEventsListSucc>> {
		try {
			const data = await dbClient.event.findMany({
				select: {
					id: true,
					planner: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					planner: event.planner,
					date: event.date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// Response
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async findManyByArtist(inputs: IdParams): Promise<Reply<IEventsListSucc>> {
		const artistId = inputs.id

		try {
			const data = await dbClient.event.findMany({
				where: {
					artists: { has: artistId },
				},
				select: {
					id: true,
					planner: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					planner: event.planner,
					date: event.date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// Response
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async findManyByDate(inputs: DateParams): Promise<Reply<IEventsListSucc>> {
		const date = inputs.date

		try {
			const data = await dbClient.event.findMany({
				where: {
					date: date,
				},
				select: {
					id: true,
					planner: true,
					place: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					planner: event.planner,
					date: date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// Response
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async findManyByPlace(inputs: PlaceParams): Promise<Reply<IEventsListSucc>> {
		const place = inputs.place

		try {
			const data = await dbClient.event.findMany({
				where: {
					place: place,
				},
				select: {
					id: true,
					planner: true,
					date: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					planner: event.planner,
					date: event.date,
					place: place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// Response
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
