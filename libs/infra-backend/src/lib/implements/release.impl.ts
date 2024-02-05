import {
	GenreParams,
	IdParams,
	NewReleaseParams,
	ReleasePriceParams,
	ReleasesRepository,
	Song,
} from "Domain"
import { ErrorMsg, INewReleaseSucc, IReleaseSucc, IReleasesListSucc } from "Shared-utils"
import { dbClient } from "../../assets"
import { Reply } from "../../assets"

export class ReleasesImplement implements ReleasesRepository {
	async create(inputs: NewReleaseParams): Promise<Reply<INewReleaseSucc>> {
		const { artist_id, title, releaseType, descript, price, genres } = inputs.release
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
					artist_id: artist_id,
					title: title,
					releaseType: releaseType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					coverUrl: null,
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

			// Specific Errors
			// ...

			return res
		}
	}

	async modifyPrice(inputs: ReleasePriceParams): Promise<Reply<boolean>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply(true)

		return res
	}

	async get(inputs: IdParams): Promise<Reply<IReleaseSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response

		const res: any = new Reply({})

		return res
	}

	async getAll(): Promise<Reply<IReleasesListSucc>> {
		// Return Response
		const res = new Reply([])

		return res
	}

	async findManyByGenre(inputs: GenreParams): Promise<Reply<IReleasesListSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<Reply<IReleasesListSucc>> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new Reply([])

		return res
	}
}
