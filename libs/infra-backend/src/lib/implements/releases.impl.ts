import { Release, ReleasesRepository, Song } from "Domain"
import {
	GenreType,
	ErrorMsg,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	IReleasesListItemSucc,
	apiErrorMsg,
	UserAuthID,
	ReleaseID,
	FileType,
} from "Shared"
import { FileManipulator, GetID, dbClient, filePath } from "../../assets"
import { Reply } from "../../assets"

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
			const res = new Reply<INewReleaseSucc>(
				undefined,
				new ErrorMsg(500, apiErrorMsg.e500, error)
			)

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
			const data = await dbClient.release.findUnique(GetID.artist(id as number))
			if (owner_id !== data?.owner_id) throw new ErrorMsg(403, apiErrorMsg.e403)

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
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async hide(id: ReleaseID, isPublic: boolean, ownerID?: UserAuthID): Promise<Reply<boolean>> {
		try {
			// owner verification
			const release = await dbClient.release.findUnique(GetID.artist(id))
			if (ownerID !== release?.owner_id) throw new ErrorMsg(403, apiErrorMsg.e403)

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
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
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
			return new Reply<IReleaseSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
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
			return new Reply<IReleasesListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
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
			return new Reply<IReleasesListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
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
			return new Reply<IReleasesListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
