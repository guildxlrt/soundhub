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
import { dbClient } from "../prisma"
import { DatabaseErrorHandler } from "../utils"

export class ReleasesImplement implements ReleasesBackendRepos {
	private release = dbClient.release
	private song = dbClient.song

	async create(release: Release): Promise<true> {
		try {
			const { owner_id, title, releaseType, descript, price, genres, folderPath } = release

			// PERSIST
			await this.release.create({
				data: {
					owner_id: owner_id,
					title: title,
					releaseType: releaseType as ReleaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					isPublic: false,
					isReadOnly: false,
					folderPath: folderPath as string,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(release: Release): Promise<boolean> {
		try {
			const { id, owner_id, price, descript, genres, title } = release

			// persist
			await this.release.update({
				where: {
					id: id as number,
					owner_id: owner_id,
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
					owner_id: true,
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
							feats: true,
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
					owner_id: true,
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

	async findManyByGenre(genre: GenreType): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				where: {
					genres: { has: genre },
					isPublic: true,
				},
				select: {
					id: true,
					owner_id: true,
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

	async findManyByDate(date: Date): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				where: {
					createdAt: date,
					isPublic: true,
				},
				select: {
					id: true,
					owner_id: true,
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

	async findManyByArtist(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				where: {
					owner_id: id,
					isPublic: true,
				},
				select: {
					id: true,
					owner_id: true,
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

	async findManyByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]> {
		try {
			const releases = (
				await this.song.findMany({
					where: {
						feats: {
							has: id,
						},
					},
					select: {
						release_id: true,
					},
				})
			).map((release) => release.release_id)

			const results: {
				id: number
				owner_id: number
				title: string
				releaseType: string
				genres: string[]
			}[] = await Promise.all(
				releases.map(async (id) => {
					const result = await this.release.findUniqueOrThrow({
						where: {
							id: id,
							isPublic: true,
						},
						select: {
							id: true,
							owner_id: true,
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

	async findManyByReleaseType(type: ReleaseType): Promise<GetShortReleaseDTO[]> {
		try {
			const data = await this.release.findMany({
				where: {
					releaseType: type,
					isPublic: true,
				},
				select: {
					id: true,
					owner_id: true,
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
			const { owner_id } = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
				},
			})
			return owner_id
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
