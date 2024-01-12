import {
	GenreType,
	EntityId,
	NewReleaseParams,
	ModifyReleaseParams,
	ReleasesRepository,
	Song,
	ErrorMsg,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	IReleasesListItemSucc,
	apiErrorMsg,
	HideReleaseParams,
} from "Shared"
import { dbClient } from "../../assets"
import { Reply } from "../../assets"

export class ReleasesImplement implements ReleasesRepository {
	async create(inputs: NewReleaseParams): Promise<Reply<INewReleaseSucc>> {
		const { owner_id, title, releaseType, descript, price, genres } = inputs.release
		const songs = inputs.songs

		try {
			// Storing files
			// ...

			const songsFormattedArray = songs.map((song): Omit<Song, "id" | "release_id"> => {
				return {
					audioUrl: "placeholder",
					title: song.title,
					featuring: song.featuring,
					lyrics: song.lyrics,
				}
			})

			const data = await dbClient.release.create({
				data: {
					owner_id: owner_id,
					title: title,
					releaseType: releaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					coverUrl: null,
					isPublic: true,
					songs: {
						create: songsFormattedArray,
					},
				},
			})

			// Response
			return new Reply<INewReleaseSucc>({ message: `${title} was created.`, id: data.id })
		} catch (error) {
			const res = new Reply<INewReleaseSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			return res
		}
	}

	async modify(inputs: ModifyReleaseParams): Promise<Reply<boolean>> {
		try {
			const { id, price, userAuth } = inputs
			console.log(userAuth)

			await dbClient.release.update({
				where: {
					id: id,
				},
				data: {
					price: price,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, new ErrorMsg(500, `Error: failed to persist`, error))
		}
	}

	async hide(inputs: HideReleaseParams): Promise<Reply<boolean>> {
		const { id, isPublic } = inputs

		try {
			await dbClient.release.update({
				where: {
					id: id,
				},
				data: {
					isPublic: isPublic,
				},
			})

			// Response
			return new Reply<boolean>(true)
		} catch (error) {
			return new Reply<boolean>(false, new ErrorMsg(500, `Error: failed to persist`, error))
		}
	}

	async get(id: EntityId): Promise<Reply<IReleaseSucc>> {
		try {
			const data = await dbClient.release.findUnique({
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

			// Response
			return new Reply<IReleaseSucc>({
				id: id,
				owner_id: id,
				title: data?.title,
				releaseType: data?.releaseType,
				descript: data?.descript,
				price: data?.price,
				genres: data?.genres,
				coverUrl: data?.coverUrl,
				songs: data?.songs,
			})
		} catch (error) {
			return new Reply<IReleaseSucc>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}

	async getAll(): Promise<Reply<IReleasesListSucc>> {
		try {
			// Calling DB
			const data = await dbClient.release.findMany({
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
			const list = data.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverUrl: null,
				}
			})

			// Response
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Reply<IReleasesListSucc>> {
		try {
			// Calling DB
			const data = await dbClient.release.findMany({
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
			const list = data.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverUrl: null,
				}
			})

			// Response
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async findManyByArtist(id: EntityId): Promise<Reply<IReleasesListSucc>> {
		const artistId = id

		try {
			// Calling DB
			const data = await dbClient.release.findMany({
				where: {
					owner_id: artistId,
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
			const list = data.map((release): IReleasesListItemSucc => {
				return {
					id: release.id,
					owner_id: release.owner_id,
					title: release.title,
					releaseType: release.releaseType,
					genres: [release.genres[0], release.genres[1], release.genres[2]],
					coverUrl: null,
				}
			})

			// Response
			return new Reply<IReleasesListSucc>(list)
		} catch (error) {
			return new Reply<IReleasesListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
