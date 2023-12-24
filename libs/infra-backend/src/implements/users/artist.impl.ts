import { Artist, ArtistRepository } from "Domain"
import {
	CreateArtistInputDTO,
	ModifyArtistInputDTO,
	FindArtistsByGenreInputDTO,
	GetAllArtistsInputDTO,
	GetArtistByEmailInputDTO,
	GetArtistByIdInputDTO,
	ReplyDTO,
	CreateArtistReplyDTO,
	ModifyArtistReplyDTO,
	GetArtistByIdReplyDTO,
	GetArtistByEmailReplyDTO,
	GetAllArtistsReplyDTO,
	FindArtistsByGenreReplyDTO,
} from "Dto"

export class ArtistImplement implements ArtistRepository {
	async create(inputs: CreateArtistInputDTO): Promise<CreateArtistReplyDTO> {
		const res = new ReplyDTO(true)

		console.log(inputs)
		return res
	}

	async modify(inputs: ModifyArtistInputDTO): Promise<ModifyArtistReplyDTO> {
		const res = new ReplyDTO(true)

		console.log(inputs)
		return res
	}

	async getById(inputs: GetArtistByIdInputDTO): Promise<GetArtistByIdReplyDTO> {
		const dbRes = new Artist(
			0,
			new Date(),
			0,
			"name",
			"bio",
			null,
			null,
			"metal",
			undefined,
			undefined
		)
		const res = new ReplyDTO(dbRes)

		console.log(inputs)
		return res
	}

	async getByEmail(inputs: GetArtistByEmailInputDTO): Promise<GetArtistByEmailReplyDTO> {
		const dbRes = new Artist(
			0,
			new Date(),
			0,
			"name",
			"bio",
			null,
			null,
			"metal",
			undefined,
			undefined
		)
		const res = new ReplyDTO(dbRes)

		console.log(inputs)
		return res
	}

	async getAll(inputs: GetAllArtistsInputDTO): Promise<GetAllArtistsReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}

	async findManyByGenre(inputs: FindArtistsByGenreInputDTO): Promise<FindArtistsByGenreReplyDTO> {
		const res = new ReplyDTO([])

		console.log(inputs)
		return res
	}
}

module.exports = new ArtistImplement()
