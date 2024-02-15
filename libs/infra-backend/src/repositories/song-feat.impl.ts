import { SongFeatBackendRepos } from "Domain"
import { ArtistProfileID, GetShortRecordDTO, IArtistName, ItemStatusEnum, SongID } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class SongFeatImplement implements SongFeatBackendRepos {
	private relation = dbClient.songFeat
	private record = dbClient.record

	async addArtists(input: { artists: ArtistProfileID[]; song: SongID }): Promise<boolean> {
		try {
			const { artists, song } = input

			return await this.relation
				.createMany({
					data: artists.map((id) => {
						return {
							artist_id: id,
							song_id: song,
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
	async removeArtists(input: { artists: ArtistProfileID[]; song: SongID }): Promise<boolean> {
		try {
			const { artists, song } = input

			return await this.relation
				.deleteMany({
					where: {
						AND: [
							{
								song_id: song,
							},
							{
								artist_id: artists[0],
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
							status: ItemStatusEnum.public,
						},
						select: {
							id: true,
							createdBy: true,
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

	async checkRights(song: number, authID: number): Promise<boolean> {
		return await this.relation
			.findFirst({
				where: {
					song_id: song,
					song: { record: { createdBy: authID } },
				},
			})
			.then((data) => {
				if (!data) return false
				else return true
			})
	}
}
