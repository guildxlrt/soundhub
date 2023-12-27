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
import { PrismaClient } from "@prisma/client"

export class ArtistImplement implements ArtistRepository {
	async create(inputs: CreateArtistInputDTO): Promise<CreateArtistReplyDTO> {
		const { name, bio, members, genres, email, password } = inputs.data

		try {
			// Calling DB
			const prisma = new PrismaClient()
			await prisma.userAuth.create({
				data: {
					email: email,
					password: password,
					Artist: {
						create: {
							name: name,
							bio: bio,
							members: members,
							genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
							avatarUrl: null,
						},
					},
				},
			})

			// Return Response
			return new ReplyDTO<string>(`Welcome, ${name} !!`)
		} catch (error) {
			return new ReplyDTO<string>(undefined, {
				status: 500,
				message: `${error}`,
			})
		}
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
			genres: ["blues", undefined, undefined],
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
			genres: ["blues", undefined, undefined],
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
