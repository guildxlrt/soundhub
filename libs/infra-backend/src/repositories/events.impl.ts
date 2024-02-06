import { EventsBackendRepos } from "Domain"
import { Event } from "Domain"
import { EventID, GenreType, IGetEventSuccess, IGetEventShortSuccess } from "Shared"
import { dbClient } from "../prisma"
import { DatabaseErrorHandler } from "../utils"

export class EventsImplement implements EventsBackendRepos {
	private event = dbClient.event
	private artist = dbClient.artist

	async create(data: Event): Promise<boolean> {
		try {
			const { organisator_id, date, place, artists, title, text } = data

			await this.event.create({
				data: {
					organisator_id: organisator_id as number,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
				},
			})

			// RESPONSE
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(data: Event): Promise<boolean> {
		try {
			const { id, organisator_id, date, place, artists, title, text } = data

			// persist
			await this.event.update({
				where: {
					id: id as number,
					organisator_id: organisator_id,
				},
				data: {
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
				},
			})

			// RESPONSE
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async delete(id: EventID): Promise<boolean> {
		try {
			// persist
			await this.event.delete({
				where: {
					id: id,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async get(id: EventID): Promise<IGetEventSuccess> {
		try {
			const event: IGetEventSuccess = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					organisator_id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					text: true,
					imagePath: true,
				},
			})

			return event
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<IGetEventShortSuccess[]> {
		try {
			const events: IGetEventShortSuccess[] = await this.event.findMany({
				select: {
					id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
				},
			})

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: EventID): Promise<IGetEventShortSuccess[]> {
		try {
			const ArtistProfileID = id

			const events: IGetEventShortSuccess[] = await this.event.findMany({
				where: {
					artists: { has: ArtistProfileID },
				},
				select: {
					id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByDate(date: Date): Promise<IGetEventShortSuccess[]> {
		try {
			const events: IGetEventShortSuccess[] = await this.event.findMany({
				where: {
					date: date,
				},
				select: {
					id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
				},
			})

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByPlace(place: string): Promise<IGetEventShortSuccess[]> {
		try {
			const events: IGetEventShortSuccess[] = await this.event.findMany({
				where: {
					place: place,
				},
				select: {
					id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
				},
			})

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByArtistGenre(genre: GenreType): Promise<IGetEventShortSuccess[]> {
		try {
			const artists = (
				await this.artist.findMany({
					where: {
						genres: { has: genre },
					},
					select: {
						id: true,
					},
				})
			).map((artist) => artist.id)

			const results = await Promise.all(
				artists.map(async (id) => {
					const result = await this.event.findMany({
						where: {
							organisator: {
								genres: { has: genre },
							},
							artists: { has: id },
						},
						select: {
							id: true,
							date: true,
							place: true,
							artists: true,
							title: true,
						},
					})

					return result
				})
			)

			const flat = results.flat(Infinity) as IGetEventShortSuccess[]
			const events = [...new Set(flat)]

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getOwner(id: number) {
		try {
			const event = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					organisator_id: true,
				},
			})
			return event?.organisator_id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to authentificate")
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
			throw DatabaseErrorHandler.handle(error).setMessage("error getting image path")
		}
	}

	async setImagePath(path: string | null, id: EventID): Promise<boolean> {
		try {
			await this.event.update({
				where: {
					id: id,
				},
				data: {
					imagePath: path,
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
