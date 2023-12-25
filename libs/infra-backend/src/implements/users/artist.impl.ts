import { ArtistRepository } from "Domain"
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
		const res = new GetArtistByIdReplyDTO({
			id: 0,
			name: "",
			bio: "",
			avatarUrl: null,
			members: null,
			genre1: "blues",
		})

		console.log(inputs)
		return res
	}

	async getByEmail(inputs: GetArtistByEmailInputDTO): Promise<GetArtistByEmailReplyDTO> {
		const res = new GetArtistByEmailReplyDTO({
			id: 0,
			name: "",
			bio: "",
			avatarUrl: null,
			members: null,
			genre1: "blues",
		})

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
