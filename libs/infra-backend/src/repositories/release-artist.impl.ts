import { ReleaseArtistRepository } from "Domain"
import { ArtistProfileID, GetShortReleaseDTO, ReleaseID } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class ReleaseArtistImplement implements ReleaseArtistRepository {
	private relation = dbClient.releaseArtist
	private release = dbClient.release

	async addArtists(artistsIDs: ArtistProfileID[], releaseID: ReleaseID): Promise<boolean> {
		try {
			return await this.relation
				.createMany({
					data: artistsIDs.map((id) => {
						return {
							artist_id: id,
							release_id: releaseID,
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
	async deleteArtists(artistsIDs: ArtistProfileID[], releaseID: ReleaseID): Promise<boolean> {
		try {
			return await this.relation
				.deleteMany({
					where: {
						AND: [
							{
								release_id: releaseID,
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

	async findReleasesByArtist(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			const data = (
				await this.relation.findMany({
					where: {
						artist_id: id,
					},
					select: {
						release_id: true,
					},
				})
			).map(async (relation) => {
				const data = await this.release.findUnique({
					where: {
						id: relation.release_id,
						isPublic: true,
					},
					select: {
						id: true,
						title: true,
						releaseType: true,
						genres: true,
					},
				})

				return data
			})

			return GetShortReleaseDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
}
