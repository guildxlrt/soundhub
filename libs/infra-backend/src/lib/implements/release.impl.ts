import {
	GenreParams,
	IdParams,
	NewReleaseParams,
	ReleasePriceParams,
	ReleasesRepository,
	Song,
} from "Domain"
import {
	CreateReleaseReplyDTO,
	FindReleasesByArtistReplyDTO,
	FindReleasesByGenreReplyDTO,
	GetAllReleasesReplyDTO,
	GetReleaseReplyDTO,
	ModifyReleasePriceReplyDTO,
	ReplyDTO,
} from "Dto"
import { ErrorMsg } from "Shared-utils"
import { dbClient } from "../../db-client"

export class ReleasesImplement implements ReleasesRepository {
	async create(inputs: NewReleaseParams): Promise<CreateReleaseReplyDTO> {
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

			await dbClient.release.create({
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
			return new ReplyDTO<string>(`${title} was created.`)
		} catch (error) {
			const res = new ReplyDTO<string>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			// Specific Errors
			// ...

			return res
		}
	}

	async modifyPrice(inputs: ReleasePriceParams): Promise<ModifyReleasePriceReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}

	async get(inputs: IdParams): Promise<GetReleaseReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response

		const res: any = new ReplyDTO({})

		return res
	}

	async getAll(): Promise<GetAllReleasesReplyDTO> {
		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByGenre(inputs: GenreParams): Promise<FindReleasesByGenreReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByArtist(inputs: IdParams): Promise<FindReleasesByArtistReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}
}
