import { ReleasesRepository } from "Domain"
import { Release, Song } from "Domain"
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
	htmlError,
} from "Shared"
import { FileManipulator, filePath } from "../utils"
import { Reply } from "../utils"
import { GetID, dbClient } from "../database"

export class ReleasesImplement implements ReleasesRepository {
	async create(
		release: { data: Release; cover: FileType },
		songs: { data: Song; audio: FileType }[]
	): Promise<Reply<INewReleaseSucc>> {
		try {
			const { owner_id, title, releaseType, descript, price, genres } = release.data
			const cover = release.cover

			const releaseFolder: string = await FileManipulator.newFolder(filePath.store.release)
			if (!releaseFolder) ErrorMsg.htmlError(htmlError[500])

			// STORING
			// songs
			const songsData = await Promise.all(
				songs.map(async (song) => {
					const { title, featuring, lyrics } = song.data

					const filename = song.audio.filename
					const location = filePath.origin.audio + filename
					const destination = filePath.store.release + releaseFolder + filename

					// move audiofiles
					const audioApth = await FileManipulator.move(location, destination)

					return {
						audioApth: audioApth as string,
						title: title,
						featuring: featuring,
						lyrics: lyrics,
					}
				})
			)

			// cover
			const coverOrigin = filePath.origin.image + cover?.filename
			const coverStore = filePath.store.release + releaseFolder + cover?.filename
			await FileManipulator.move(coverOrigin, coverStore)

			// PERSIST
			const newRelease = await dbClient.release.create({
				data: {
					owner_id: owner_id,
					title: title,
					releaseType: releaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					coverPath: coverStore,
					isPublic: true,
					songs: {
						create: songsData,
					},
				},
			})

			// RESPONSE
			return new Reply<INewReleaseSucc>({
				message: `${title} was created.`,
				id: newRelease.id,
			})
		} catch (error) {
			const res = new Reply<INewReleaseSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))

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
			if (owner_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// ... get the old path
			const releaseData = await dbClient.release.findUnique({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				select: {
					coverPath: true,
				},
			})

			const oldFilePath = releaseData?.coverPath as string
			const releaseFolder = FileManipulator.getReleaseFolder(oldFilePath)

			// STORING FILE
			const location = filePath.origin.image + cover?.filename
			const destination = filePath.store.release + releaseFolder + cover?.filename
			const coverPath = await FileManipulator.move(location, destination)

			// DELETE OLD FILE
			await FileManipulator.delete(oldFilePath)

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
					coverPath: coverPath,
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
			return new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async hide(id: ReleaseID, isPublic: boolean, ownerID?: UserAuthID): Promise<Reply<boolean>> {
		try {
			// owner verification
			const releaseOwner = await GetID.owner(id as number, "release")
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

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
			return new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))
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
					coverPath: true,
					songs: {
						select: {
							audioApth: true,
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
				coverPath: release?.coverPath,
				songs: release?.songs,
			})
		} catch (error) {
			return new Reply<IReleaseSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
					coverPath: true,
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
					coverPath: null,
				}
			})

			// RESPONSE
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], ErrorMsg.htmlError(htmlError[500]))
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
					coverPath: true,
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
					coverPath: null,
				}
			})

			// RESPONSE
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], ErrorMsg.htmlError(htmlError[500]))
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
					coverPath: true,
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
					coverPath: null,
				}
			})

			// RESPONSE
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], ErrorMsg.htmlError(htmlError[500]))
		}
	}
}
