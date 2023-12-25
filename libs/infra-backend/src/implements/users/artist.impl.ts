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
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}

	async modify(inputs: ModifyArtistInputDTO): Promise<ModifyArtistReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}

	async getById(inputs: GetArtistByIdInputDTO): Promise<GetArtistByIdReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new GetArtistByIdReplyDTO({
			id: 0,
			name: "",
			bio: "",
			avatarUrl: null,
			members: null,
			genre1: "blues",
		})

		return res
	}

	async getByEmail(inputs: GetArtistByEmailInputDTO): Promise<GetArtistByEmailReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new GetArtistByEmailReplyDTO({
			id: 0,
			name: "",
			bio: "",
			avatarUrl: null,
			members: null,
			genre1: "blues",
		})

		return res
	}

	async getAll(inputs: GetAllArtistsInputDTO): Promise<GetAllArtistsReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}

	async findManyByGenre(inputs: FindArtistsByGenreInputDTO): Promise<FindArtistsByGenreReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO([])

		return res
	}
}

module.exports = new ArtistImplement()
