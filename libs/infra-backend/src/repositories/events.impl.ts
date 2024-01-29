import { EventsBackendRepos } from "Domain"
import { Event } from "Domain"
import {
	ErrorMsg,
	IEventSucc,
	IEventsListItemSucc,
	IEventsListSucc,
	EventID,
	htmlError,
	ErrorHandler,
} from "Shared"
import { dbClient } from "../database"

export class EventsImplement implements EventsBackendRepos {
	private event = dbClient.event

	async create(data: Event): Promise<boolean> {
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
			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(data: Event): Promise<boolean> {
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
			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: EventID): Promise<void> {
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
			return
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: EventID): Promise<IEventSucc> {
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
			return {
				id: event?.id,
				owner_id: event?.owner_id,
				date: event?.date,
				place: event?.place,
				artists: event?.artists,
				title: event?.title,
				text: event?.text,
				imagePath: event?.imagePath,
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<IEventsListSucc> {
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
			return event.map((event): IEventsListItemSucc => {
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
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: EventID): Promise<IEventsListSucc> {
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
			return event.map((event): IEventsListItemSucc => {
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
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByDate(date: Date): Promise<IEventsListSucc> {
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
			return event.map((event): IEventsListItemSucc => {
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
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByPlace(place: string): Promise<IEventsListSucc> {
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
			return event.map((event): IEventsListItemSucc => {
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
		} catch (error) {
			throw ErrorHandler.handle(error)
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
			throw ErrorHandler.handle(error).setMessage("error to authentificate")
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
			throw ErrorHandler.handle(error).setMessage("error getting image path")
		}
	}
}
