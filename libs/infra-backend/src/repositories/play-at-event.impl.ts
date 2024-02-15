import { PlayAtEventRepository } from "Domain"
import { EventID, GenreType, IGetEventShortSuccess } from "Shared"
import { DatabaseErrorHandler } from "../utils"
import { dbClient } from "../database"

export class PlayAtEventImplement implements PlayAtEventRepository {
	private relation = dbClient.playAtEvent
	private artist = dbClient.artist

	async addArtists(input: { artists: number[]; event: number }): Promise<boolean> {
		try {
			const { artists, event } = input

			if (artists.length < 1) return false
			else
				return await this.relation
					.createMany({
						data: artists.map((id) => {
							return {
								artist_id: id,
								event_id: event,
							}
						}),
					})
					.then(() => {
						return true
					})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async removeArtists(input: { artists: number[]; event: number }): Promise<boolean> {
		const { artists, event } = input

		return await Promise.all(
			artists.map(async (artist) => {
				return await this.relation
					.deleteMany({
						where: {
							event_id: event,
							artist_id: artist,
						},
					})
					.then(() => {
						return true
					})
			})
		)
			.then(() => {
				return true
			})
			.catch((error) => {
				throw DatabaseErrorHandler.handle(error)
			})
	}

	async findEventsByArtist(id: EventID): Promise<IGetEventShortSuccess[]> {
		try {
			const ArtistProfileID = id

			const result = (
				await this.relation.findMany({
					where: {
						artist_id: ArtistProfileID,
					},
					select: {
						event: {
							select: {
								id: true,
								date: true,
								place: true,
								title: true,
								imagePath: true,
								playAtEvent: {
									select: {
										artist_id: true,
									},
								},
							},
						},
					},
				})
			).map((item) => {
				const { ["playAtEvent"]: playAtEvent, ...otherDatas } = item.event

				const artists = playAtEvent.map((item) => {
					return item.artist_id
				})
				return { ...otherDatas, artists }
			})

			return result
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findEventsByArtistGenre(genre: GenreType): Promise<IGetEventShortSuccess[]> {
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
					return (
						await this.relation.findMany({
							where: {
								artist_id: id,
							},
							select: {
								event: {
									select: {
										id: true,
										date: true,
										place: true,
										title: true,
										playAtEvent: {
											select: {
												artist_id: true,
											},
										},
									},
								},
							},
						})
					).map((item) => {
						const { ["playAtEvent"]: playAtEvent, ...otherDatas } = item.event

						const artists = playAtEvent.map((item) => {
							return item.artist_id
						})
						return { ...otherDatas, artists }
					})
				})
			)

			const flat = results.flat(2)
			const events = [...new Set(flat)]

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async checkRights(event: number, authID: number): Promise<boolean> {
		return await this.relation
			.findFirst({
				where: {
					event_id: event,
					event: { createdBy: authID },
				},
			})
			.then((data) => {
				if (!data) return false
				else return true
			})
	}
}
