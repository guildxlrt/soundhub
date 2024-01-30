import { ReleasesBackendRepos } from "Domain"
import { Release, Song } from "Domain"
import { GenreType, ReleaseID, IFile, ReleaseDTO, ReleaseShortDTO } from "Shared"
import { dbClient } from "../prisma"
import { ApiErrHandler } from "../utils"

export class ReleasesImplement implements ReleasesBackendRepos {
	private release = dbClient.release

	async create(release: { data: Release; cover: IFile }, songs: { data: Song }[]): Promise<true> {
		try {
			const { owner_id, title, releaseType, descript, price, genres } = release.data

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
			await this.release.create({
				data: {
					owner_id: owner_id,
					title: title,
					releaseType: releaseType,
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
			throw new ApiErrHandler().handleDBError(error)
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
			throw new ApiErrHandler().handleDBError(error)
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
			throw new ApiErrHandler().handleDBError(error)
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
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async get(id: ReleaseID): Promise<ReleaseDTO> {
		try {
			const data = await this.release.findUniqueOrThrow({
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
							id: true,
							title: true,
							featuring: true,
							lyrics: true,
							audioPath: true,
						},
					},
				},
			})

			return ReleaseDTO.createFromData(data)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async getAll(): Promise<ReleaseShortDTO[]> {
		try {
			// Calling DB
			const data = await this.release.findMany({
				select: {
					id: true,
					title: true,
					releaseType: true,
					genres: true,
				},
			})

			return ReleaseShortDTO.createArrayFromData(data)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<ReleaseShortDTO[]> {
		try {
			// Calling DB
			const data = await this.release.findMany({
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
			return ReleaseShortDTO.createArrayFromData(data)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async findManyByArtist(id: ReleaseID): Promise<ReleaseShortDTO[]> {
		try {
			const profileID = id

			// Calling DB
			const data = await this.release.findMany({
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

			return ReleaseShortDTO.createArrayFromData(data)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
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
			throw new ApiErrHandler().handleDBError(error)
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
			throw new ApiErrHandler().handleDBError(error)
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
			throw new ApiErrHandler().handleDBError(error).setMessage("error to get image path")
		}
	}
}
