import { ReleasesBackendRepos, StreamFile } from "Domain"
import { Release, Song } from "Domain"
import {
	GenreType,
	ReleaseID,
	GetShortReleaseDTO,
	ReleaseType,
	IGetFullReleaseSuccess,
	ProfileID,
} from "Shared"
import { dbClient } from "../prisma"
import { DatabaseErrorHandler } from "../utils"

export class ReleasesImplement implements ReleasesBackendRepos {
	private release = dbClient.release
	private song = dbClient.song

	async create(
		release: { data: Release; cover: StreamFile },
		songs: { data: Song }[]
	): Promise<true> {
		try {
			const { owner_id, title, releaseType, descript, price, genres } = release.data

			// songs
			const songsData = await Promise.all(
				songs.map(async (song) => {
					const { title, feats, lyrics, audioPath } = song.data

					return {
						audioPath: audioPath as string,
						title: title,
						feats: feats,
						lyrics: lyrics,
					}
				})
			)

			// PERSIST
			await this.release.create({
				data: {
					owner_id: owner_id,
					title: title,
					releaseType: releaseType as ReleaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					isPublic: true,
					songs: {
						create: songsData,
					},
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(release: { data: Release }): Promise<boolean> {
		try {
			const { id, owner_id, price, descript, genres, title } = release.data

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
					coverPath: true,
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

	async findManyByArtist(id: ProfileID): Promise<GetShortReleaseDTO[]> {
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

	async findManyByArtistFeats(id: ProfileID): Promise<GetShortReleaseDTO[]> {
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

	async getOwner(id: ProfileID) {
		try {
			const release = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
				},
			})
			return release?.owner_id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getPublicStatus(id: ReleaseID): Promise<boolean> {
		try {
			const release = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					isPublic: true,
				},
			})

			return release?.isPublic
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getCoverPath(releaseID: ReleaseID): Promise<string | null> {
		try {
			const releaseData = await this.release.findUniqueOrThrow({
				where: {
					id: releaseID as number,
				},
				select: {
					coverPath: true,
				},
			})

			return releaseData?.coverPath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async setCoverPath(path: string | null, id: ReleaseID): Promise<boolean> {
		try {
			await this.release.update({
				where: {
					id: id,
				},
				data: {
					coverPath: path,
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
