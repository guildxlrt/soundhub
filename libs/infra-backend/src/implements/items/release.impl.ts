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
		const res = new ReplyDTO(true)

		console.log(inputs)
		return res
	}

	async modifyPrice(inputs: ModifyReleasePriceInputDTO): Promise<ModifyReleasePriceReplyDTO> {
		{
			const res = new ReplyDTO(true)

			console.log(inputs)
			return res
		}
	}

	async get(inputs: GetReleaseInputDTO): Promise<GetReleaseReplyDTO> {
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
			undefined
		)
		const res = new ReplyDTO(dbRes)

		console.log(inputs)
		return res
	}

	async getAll(inputs: GetAllReleasesInputDTO): Promise<GetAllReleasesReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}

	async findManyByGenre(
		inputs: FindReleasesByGenreInputDTO
	): Promise<FindReleasesByGenreReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}

	async findManyByArtist(
		inputs: FindReleasesByArtistInputDTO
	): Promise<FindReleasesByArtistReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}
}
