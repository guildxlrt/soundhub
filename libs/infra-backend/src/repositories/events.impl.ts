import { EventsBackendRepos } from "Domain"
import { Event } from "Domain"
import { Reply } from "../utils"
import {
	ErrorMsg,
	IEventSucc,
	IEventsListItemSucc,
	IEventsListSucc,
	EventID,
	htmlError,
} from "Shared"
import { dbClient } from "../database"

export class EventsImplement implements EventsBackendRepos {
	private event = dbClient.event

	async create(data: Event): Promise<Reply<boolean>> {
		try {
			const { owner_id, date, place, artists, title, text } = data

			// // Storing files
			// const fileOrigin = filePath.origin.image + file?.filename
			// const fileStore = filePath.store.event + file?.filename
			// await FileManipulator.move(fileOrigin, fileStore)

			await this.event.create({
				data: {
					owner_id: owner_id as number,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
					// imagePath: fileStore,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async edit(data: Event): Promise<Reply<boolean>> {
		try {
			const { id, owner_id, date, place, artists, title, text } = data

			// // owner verification
			// const eventOwner = await GetID.owner(id as number, "event")
			// if (userAuth !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// // STORING FILE
			// const fileOrigin = filePath.origin.image + file?.filename
			// const fileStore = filePath.store.event + file?.filename
			// await FileManipulator.move(fileOrigin, fileStore)

			// // DELETE OLD FILE
			// // ... get the id
			// await FileManipulator.delete("")

			// persist
			await this.event.update({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				data: {
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
					// imagePath: fileStore,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async delete(id: EventID): Promise<Reply<void>> {
		try {
			// // owner verification
			// const eventOwner = await GetID.owner(id as number, "event")
			// if (userAuth !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await this.event.delete({
				where: {
					id: id,
				},
			})

			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(undefined, new ErrorMsg(`Error: failed to delete`, 500))

			return res
		}
	}

	async get(id: EventID): Promise<Reply<IEventSucc>> {
		try {
			const event = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					owner_id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					text: true,
					imagePath: true,
				},
			})

			// RESPONSE
			return new Reply<IEventSucc>({
				id: event?.id,
				owner_id: event?.owner_id,
				date: event?.date,
				place: event?.place,
				artists: event?.artists,
				title: event?.title,
				text: event?.text,
				imagePath: event?.imagePath,
			})
		} catch (error) {
			return new Reply<IEventSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async getAll(): Promise<Reply<IEventsListSucc>> {
		try {
			const event = await this.event.findMany({
				select: {
					id: true,
					owner_id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			// Reorganize
			const list = event.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: event.date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async findManyByArtist(id: EventID): Promise<Reply<IEventsListSucc>> {
		try {
			const profileID = id

			const event = await this.event.findMany({
				where: {
					artists: { has: profileID },
				},
				select: {
					id: true,
					owner_id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			// Reorganize
			const list = event.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: event.date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async findManyByDate(date: Date): Promise<Reply<IEventsListSucc>> {
		try {
			const event = await this.event.findMany({
				where: {
					date: date,
				},
				select: {
					id: true,
					owner_id: true,
					place: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			// Reorganize
			const list = event.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async findManyByPlace(place: string): Promise<Reply<IEventsListSucc>> {
		try {
			const event = await this.event.findMany({
				where: {
					place: place,
				},
				select: {
					id: true,
					owner_id: true,
					date: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			// Reorganize
			const list = event.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: event.date,
					place: place,
					artists: event.artists,
					title: event.title,
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async getOwner(id: number) {
		try {
			const event = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
				},
			})
			return event?.owner_id
		} catch (error) {
			throw new ErrorMsg("Error verifying auths", 500).treatError(error)
		}
	}

	async getImagePath(id: EventID): Promise<string | null> {
		try {
			const event = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					imagePath: true,
				},
			})
			return event?.imagePath
		} catch (error) {
			throw new ErrorMsg("Error verifying auths", 500).treatError(error)
		}
	}
}
