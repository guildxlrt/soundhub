import { Release, ReleaseRepository } from "Domain"
import {
	CreateReleaseInputDTO,
	CreateReleaseReplyDTO,
	FindReleasesByArtistInputDTO,
	FindReleasesByArtistReplyDTO,
	FindReleasesByGenreInputDTO,
	FindReleasesByGenreReplyDTO,
	GetAllReleasesInputDTO,
	GetAllReleasesReplyDTO,
	GetReleaseInputDTO,
	GetReleaseReplyDTO,
	ModifyReleasePriceInputDTO,
	ModifyReleasePriceReplyDTO,
	ReplyDTO,
} from "Dto"

export class ReleaseImplement implements ReleaseRepository {
	async create(inputs: CreateReleaseInputDTO): Promise<CreateReleaseReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
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

	async getAll(inputs: GetAllReleasesInputDTO): Promise<GetAllReleasesReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

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
