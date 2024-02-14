import { ReleasesBackendRepos } from "Domain"
import { Release } from "Domain"
import {
	GenreType,
	ReleaseID,
	GetShortReleaseDTO,
	ReleaseType,
	IGetFullReleaseSuccess,
	ArtistProfileID,
} from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class ReleasesImplement implements ReleasesBackendRepos {
	private release = dbClient.release
	private song = dbClient.song

	async create(data: { release: Release; artists: ArtistProfileID[] }): Promise<true> {
		try {
			const { release, artists } = data
			const { publisher_id, title, releaseType, descript, price, genres, folderPath } =
				release

			// PERSIST
			await this.release.create({
				data: {
					publisher_id: publisher_id,
					title: title,
					releaseType: releaseType as ReleaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					isPublic: false,
					isReadOnly: false,
					folderPath: folderPath as string,
					releasesArtists: {
						createMany: {
							data: artists.map((id) => {
								return {
									artist_id: id,
								}
							}),
						},
					},
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(release: Release): Promise<boolean> {
		try {
			const { id, publisher_id, price, descript, genres, title } = release

			// persist
			await this.release.update({
				where: {
					id: id as number,
					publisher_id: publisher_id,
				},
				data: {
					title: title,
					price: price,
					descript: descript,
					genres: genres as string[],
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			// persist
			await this.release.delete({
				where: {
					id: id,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async publish(id: ReleaseID) {
		try {
			// persist
			await this.release
				.update({
					where: {
						id: id as number,
					},
					data: {
						isPublic: true,
						isReadOnly: true,
					},
				})
				.then(async (data) => {
					await this.song.updateMany({
						where: {
							release_id: data.id,
						},
						data: {
							isReadOnly: true,
						},
					})
				})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async setPublicStatus(id: ReleaseID, isPublic: boolean): Promise<boolean> {
		try {
			await this.release.update({
				where: {
					id: id,
				},
				data: {
					isPublic: isPublic,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async get(id: ReleaseID): Promise<IGetFullReleaseSuccess> {
		try {
			const data = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					createdAt: true,
					publisher_id: true,
					title: true,
					releaseType: true,
					descript: true,
					price: true,
					genres: true,
					folderPath: true,
					isPublic: true,
					songs: {
						select: {
							id: true,
							title: true,
							lyrics: true,
							audioPath: true,
						},
					},
				},
			})

			return data
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				select: {
					id: true,
					publisher_id: true,
					title: true,
					releaseType: true,
					genres: true,
				},
				where: {
					isPublic: true,
				},
			})

			return GetShortReleaseDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByGenre(genre: GenreType): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				where: {
					genres: { has: genre },
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
			return GetShortReleaseDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByDate(date: Date): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				where: {
					createdAt: date,
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
			return GetShortReleaseDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByReleaseType(type: ReleaseType): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				where: {
					releaseType: type,
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

			return GetShortReleaseDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getEditability(id: ReleaseID): Promise<boolean> {
		try {
			const { isReadOnly } = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					isReadOnly: true,
				},
			})
			return isReadOnly
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getOwner(id: ArtistProfileID): Promise<number | undefined> {
		try {
			const { publisher_id } = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					publisher_id: true,
				},
			})
			return publisher_id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getPublicStatus(id: ReleaseID): Promise<boolean> {
		try {
			const { isPublic } = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					isPublic: true,
				},
			})

			return isPublic
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getFolderPath(releaseID: ReleaseID): Promise<string | null> {
		try {
			const { folderPath } = await this.release.findUniqueOrThrow({
				where: {
					id: releaseID as number,
				},
				select: {
					folderPath: true,
				},
			})

			return folderPath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
}
