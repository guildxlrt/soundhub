import { ReleasesBackendRepos } from "Domain"
import { Release, Song } from "Domain"
import {
	GenreType,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	IReleasesListItemSucc,
	ReleaseID,
	IFile,
	ErrorHandler,
} from "Shared"
import { dbClient } from "../database"

export class ReleasesImplement implements ReleasesBackendRepos {
	private release = dbClient.release

	async create(
		release: { data: Release; cover: IFile },
		songs: { data: Song }[]
	): Promise<INewReleaseSucc> {
		try {
			const { owner_id, title, releaseType, descript, price, genres, coverPath } =
				release.data

			// songs
			const songsData = await Promise.all(
				songs.map(async (song) => {
					const { title, featuring, lyrics, audioPath } = song.data

					return {
						audioPath: audioPath as string,
						title: title,
						featuring: featuring,
						lyrics: lyrics,
					}
				})
			)

			// PERSIST
			const newRelease = await this.release.create({
				data: {
					owner_id: owner_id,
					title: title,
					releaseType: releaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					coverPath: coverPath,
					isPublic: true,
					songs: {
						create: songsData,
					},
				},
			})

			return {
				message: `${title} was created.`,
				id: newRelease.id,
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(release: { data: Release }): Promise<boolean> {
		try {
			const { id, owner_id, price, descript, genres, coverPath } = release.data

			// persist
			await this.release.update({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				data: {
					price: price,
					descript: descript,
					genres: genres as string[],
					coverPath: coverPath,
				},
			})

			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getPrivStatus(id: ReleaseID): Promise<boolean> {
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
			throw ErrorHandler.handle(error)
		}
	}

	async setPrivStatus(id: ReleaseID, isPublic: boolean): Promise<boolean> {
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
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: ReleaseID): Promise<IReleaseSucc> {
		try {
			const release = await this.release.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
					title: true,
					releaseType: true,
					descript: true,
					price: true,
					genres: true,
					coverPath: true,
					songs: {
						select: {
							audioPath: true,
							title: true,
						},
					},
				},
			})

			return {
				id: id,
				owner_id: id,
				title: release?.title,
				releaseType: release?.releaseType,
				descript: release?.descript,
				price: release?.price,
				genres: release?.genres,
				coverPath: release?.coverPath,
				songs: release?.songs,
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<IReleasesListSucc> {
		try {
			// Calling DB
			const release = await this.release.findMany({
				select: {
					id: true,
					owner_id: true,
					title: true,
					releaseType: true,
					genres: true,
					coverPath: true,
				},
			})

			// Reorganize
			return release.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverPath: null,
				}
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<IReleasesListSucc> {
		try {
			// Calling DB
			const release = await this.release.findMany({
				where: {
					genres: { has: genre },
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					releaseType: true,
					genres: true,
					coverPath: true,
				},
			})

			// Reorganize
			return release.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverPath: null,
				}
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: ReleaseID): Promise<IReleasesListSucc> {
		try {
			const profileID = id

			// Calling DB
			const release = await this.release.findMany({
				where: {
					owner_id: profileID,
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					releaseType: true,
					genres: true,
					coverPath: true,
				},
			})

			// Reorganize
			return release.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverPath: null,
				}
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getOwner(id: number) {
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
			throw ErrorHandler.handle(error)
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
			throw ErrorHandler.handle(error)
		}
	}
}
