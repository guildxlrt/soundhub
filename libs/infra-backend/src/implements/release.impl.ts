import { dbClient, dbErrHandler } from "DbClient"
import { Release, ReleaseRepository } from "Domain"
import {
	CreateReleaseInputDTO,
	CreateReleaseReplyDTO,
	FindReleasesByArtistInputDTO,
	FindReleasesByArtistReplyDTO,
	FindReleasesByGenreInputDTO,
	FindReleasesByGenreReplyDTO,
	GetAllReleasesReplyDTO,
	GetReleaseInputDTO,
	GetReleaseReplyDTO,
	ModifyReleasePriceInputDTO,
	ModifyReleasePriceReplyDTO,
	ReplyDTO,
} from "Dto"
import { ErrorMsg } from "Shared-utils"

export class ReleaseImplement implements ReleaseRepository {
	async create(inputs: CreateReleaseInputDTO): Promise<CreateReleaseReplyDTO> {
		const { artist_id, title, releaseType, descript, price, genres, songs_array } = inputs.data

		try {
			// Storing files
			// ...

			const songsFormattedArray = songs_array.map((song) => {
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
					genres: genres,
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

	async modifyPrice(inputs: ModifyReleasePriceInputDTO): Promise<ModifyReleasePriceReplyDTO> {
		{
			// Calling DB
			// ... some logic
			console.log(inputs)

			// Return Response
			const res = new ReplyDTO(true)

			return res
		}
	}

	async get(inputs: GetReleaseInputDTO): Promise<GetReleaseReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const dbRes = new Release(
			0,
			new Date(),
			0,
			"title",
			"album",
			"descript",
			9,
			["metal", "rock", "blues"],
			[],
			null
		)
		const res = new ReplyDTO(dbRes)

		return res
	}

	async getAll(): Promise<GetAllReleasesReplyDTO> {
		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByGenre(
		inputs: FindReleasesByGenreInputDTO
	): Promise<FindReleasesByGenreReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByArtist(
		inputs: FindReleasesByArtistInputDTO
	): Promise<FindReleasesByArtistReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}
}
