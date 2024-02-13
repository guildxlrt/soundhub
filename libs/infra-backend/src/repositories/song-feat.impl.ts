import { SongFeatRepository } from "Domain"
import { ArtistProfileID, GetShortReleaseDTO, SongID } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class SongFeatImplement implements SongFeatRepository {
	private relation = dbClient.songFeat
	private release = dbClient.release

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

	async findReleasesByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			const releasesIDs = (
				await this.relation.findMany({
					where: {
						artist_id: id,
					},
					select: {
						song: {
							select: {
								release_id: true,
							},
						},
					},
				})
			).map((result) => {
				return result.song.release_id
			})

			const results = await Promise.all(
				releasesIDs.map(async (id) => {
					const result = await this.release.findUniqueOrThrow({
						where: {
							id: id,
							isPublic: true,
						},
						select: {
							id: true,
							publisher_id: true,
							title: true,
							releaseType: true,
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
}
