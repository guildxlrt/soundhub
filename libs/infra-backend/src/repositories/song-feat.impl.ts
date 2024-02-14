import { SongFeatRepository } from "Domain"
import { ArtistProfileID, GetShortRecordDTO, IArtistName, SongID } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class SongFeatImplement implements SongFeatRepository {
	private relation = dbClient.songFeat
	private record = dbClient.record

	async addArtists(artistsIDs: ArtistProfileID[], songID: SongID): Promise<boolean> {
		try {
			return await this.relation
				.createMany({
					data: artistsIDs.map((id) => {
						return {
							artist_id: id,
							song_id: songID,
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
	async deleteArtists(artistsIDs: ArtistProfileID[], songID: SongID): Promise<boolean> {
		try {
			return await this.relation
				.deleteMany({
					where: {
						AND: [
							{
								song_id: songID,
							},
							{
								artist_id: artistsIDs[0],
							},
						],
					},
				})
				.then(() => {
					return true
				})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findSongsByArtistFeats(id: ArtistProfileID): Promise<GetShortRecordDTO[]> {
		try {
			const recordsIDs = (
				await this.relation.findMany({
					where: {
						artist_id: id,
					},
					select: {
						song: {
							select: {
								record_id: true,
							},
						},
					},
				})
			).map((result) => {
				return result.song.record_id
			})

			const results = await Promise.all(
				recordsIDs.map(async (id) => {
					const result = await this.record.findUniqueOrThrow({
						where: {
							id: id,
							isPublic: true,
						},
						select: {
							id: true,
							publisher_id: true,
							title: true,
							recordType: true,
							genres: true,
						},
					})

					return result
				})
			)

			return results
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getArtistsNamesOfSong(id: SongID): Promise<IArtistName[]> {
		try {
			const data = (
				await this.relation.findMany({
					where: {
						song_id: id,
					},
					select: {
						artist: {
							select: { id: true, name: true },
						},
					},
				})
			).map((result) => {
				const { name, id } = result.artist
				return {
					name: name,
					id: id,
				}
			})

			return data
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
}
