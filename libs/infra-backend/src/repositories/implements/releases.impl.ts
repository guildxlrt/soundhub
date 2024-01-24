import { Release, ReleasesRepository, Song } from "Domain"
import {
	GenreType,
	ErrorMsg,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	IReleasesListItemSucc,
	UserAuthID,
	ReleaseID,
	FileType,
	apiError,
} from "Shared"
import { FileManipulator, filePath } from "../../utils"
import { Reply } from "../../utils"
import { GetID, dbClient } from "../../database"

export class ReleasesImplement implements ReleasesRepository {
	async create(
		release: { data: Release; cover: FileType },
		songs: { data: Song; audio: FileType }[]
	): Promise<Reply<INewReleaseSucc>> {
		try {
			const { owner_id, title, releaseType, descript, price, genres } = release.data
			const cover = release.cover

			const releaseFolder = FileManipulator.randomReleaseFolder()

			// STORING
			// songs
			songs.forEach((song) => {
				const filename = song.audio?.filename
				const coverOrigin = filePath.origin.image + filename
				const coverStore = filePath.store.release + releaseFolder + filename
				FileManipulator.move(coverOrigin, coverStore)
			})

			// release
			const coverOrigin = filePath.origin.image + cover?.filename
			const coverStore = filePath.store.release + releaseFolder + cover?.filename
			FileManipulator.move(coverOrigin, coverStore)

			// PERSIST
			const songsFormattedArray = songs.map((song) => {
				const { title, featuring, lyrics } = song.data

				const coverStore = filePath.store.release + song.audio?.filename

				return {
					audioUrl: coverStore,
					title: title,
					featuring: featuring,
					lyrics: lyrics,
				}
			})

			const newRelease = await dbClient.release.create({
				data: {
					owner_id: owner_id,
					title: title,
					releaseType: releaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					coverUrl: coverStore,
					isPublic: true,
					songs: {
						create: songsFormattedArray,
					},
				},
			})

			// RESPONSE
			return new Reply<INewReleaseSucc>({
				message: `${title} was created.`,
				id: newRelease.id,
			})
		} catch (error) {
			const res = new Reply<INewReleaseSucc>(undefined, ErrorMsg.apiError(apiError[500]))

			return res
		}
	}

	async edit(
		release: { data: Release; cover?: FileType },
		songs: Song[]
	): Promise<Reply<boolean>> {
		try {
			const { id, owner_id, price, descript, genres } = release.data

			const cover = release.cover

			// owner verification
			const releaseOwner = await GetID.owner(id as number, "release")
			if (owner_id !== releaseOwner) throw ErrorMsg.apiError(apiError[403])

			// ... get the old path
			const releaseData = await dbClient.release.findUnique({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				select: {
					coverUrl: true,
				},
			})

			const coverUrl = releaseData?.coverUrl as string
			const releaseFolder = FileManipulator.getReleaseFolder(coverUrl)

			// STORING FILE
			const coverOrigin = filePath.origin.image + cover?.filename
			const coverStore = filePath.store.release + releaseFolder + cover?.filename
			FileManipulator.move(coverOrigin, coverStore)

			// DELETE OLD FILE
			FileManipulator.delete(releaseFolder as string)

			// persist
			await dbClient.release.update({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				data: {
					price: price,
					descript: descript,
					genres: genres as string[],
					coverUrl: coverStore,
				},
			})

			songs.map(async (song) => {
				await dbClient.song.update({
					where: {
						id: song.id as number,
						release_id: id as number,
					},
					data: {
						lyrics: song.lyrics,
					},
				})
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.apiError(apiError[500]))
		}
	}

	async hide(id: ReleaseID, isPublic: boolean, ownerID?: UserAuthID): Promise<Reply<boolean>> {
		try {
			// owner verification
			const releaseOwner = await GetID.owner(id as number, "release")
			if (ownerID !== releaseOwner) throw ErrorMsg.apiError(apiError[403])

			// persist
			await dbClient.release.update({
				where: {
					id: id,
				},
				data: {
					isPublic: isPublic,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.apiError(apiError[500]))
		}
	}

	async get(id: ReleaseID): Promise<Reply<IReleaseSucc>> {
		try {
			const release = await dbClient.release.findUnique({
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
					coverUrl: true,
					songs: {
						select: {
							audioUrl: true,
							title: true,
						},
					},
				},
			})

			// RESPONSE
			return new Reply<IReleaseSucc>({
				id: id,
				owner_id: id,
				title: release?.title,
				releaseType: release?.releaseType,
				descript: release?.descript,
				price: release?.price,
				genres: release?.genres,
				coverUrl: release?.coverUrl,
				songs: release?.songs,
			})
		} catch (error) {
			return new Reply<IReleaseSucc>(undefined, ErrorMsg.apiError(apiError[500]))
		}
	}

	async getAll(): Promise<Reply<IReleasesListSucc>> {
		try {
			// Calling DB
			const release = await dbClient.release.findMany({
				select: {
					id: true,
					owner_id: true,
					title: true,
					releaseType: true,
					genres: true,
					coverUrl: true,
				},
			})

			// Reorganize
			const list = release.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverUrl: null,
				}
			})

			// RESPONSE
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], ErrorMsg.apiError(apiError[500]))
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Reply<IReleasesListSucc>> {
		try {
			// Calling DB
			const release = await dbClient.release.findMany({
				where: {
					genres: { has: genre },
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					releaseType: true,
					genres: true,
					coverUrl: true,
				},
			})

			// Reorganize
			const list = release.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverUrl: null,
				}
			})

			// RESPONSE
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], ErrorMsg.apiError(apiError[500]))
		}
	}

	async findManyByArtist(id: ReleaseID): Promise<Reply<IReleasesListSucc>> {
		try {
			const artistID = id

			// Calling DB
			const release = await dbClient.release.findMany({
				where: {
					owner_id: artistID,
				},
				select: {
					id: true,
					owner_id: true,
					title: true,
					releaseType: true,
					genres: true,
					coverUrl: true,
				},
			})

			// Reorganize
			const list = release.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverUrl: null,
				}
			})

			// RESPONSE
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], ErrorMsg.apiError(apiError[500]))
		}
	}
}
