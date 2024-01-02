import { ArtistRepository } from "Domain"
import {
	CreateArtistInputDTO,
	ModifyArtistInputDTO,
	FindArtistsByGenreInputDTO,
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
import { ErrorMsg, IArtist, ArtistsList, ArtistsListItem, errorMsg } from "Shared-utils"
import { dbClient, dbErrHandler } from "DbClient"

export class ArtistImplement implements ArtistRepository {
	async create(inputs: CreateArtistInputDTO): Promise<CreateArtistReplyDTO> {
		const { name, bio, members, genres, email, password } = inputs.data

		try {
			await dbClient.userAuth.create({
				data: {
					email: email,
					password: password,
					artists: {
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

			// Response
			return new ReplyDTO<string>(`Welcome, ${name} !!`)
		} catch (error) {
			const res = new ReplyDTO<string>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			// Email must be unique
			dbErrHandler.uniqueEmail(error, res)

			return res
		}
	}

	async modify(inputs: ModifyArtistInputDTO): Promise<ModifyArtistReplyDTO> {
		const { name, bio, members, genres, id } = inputs.data

		try {
			await dbClient.artist.update({
				where: {
					id: id,
				},
				data: {
					name: name,
					bio: bio,
					members: members,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
				},
			})

			// Return Response
			const res = new ReplyDTO(true)

			return res
		} catch (error) {
			const res = new ReplyDTO<boolean>(
				false,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			return res
		}
	}

	async getById(inputs: GetArtistByIdInputDTO): Promise<GetArtistByIdReplyDTO> {
		const id = inputs.data

		try {
			const data = await dbClient.artist.findUnique({
				where: {
					id: id,
				},
				select: {
					name: true,
					bio: true,
					members: true,
					genres: true,
					avatarUrl: true,
				},
			})

			// Return Response
			const res = new ReplyDTO<IArtist>({
				id: id,
				name: data?.name,
				bio: null,
				members: data?.members,
				genres: [data?.genres[0], data?.genres[1], data?.genres[2]],
				avatarUrl: null,
			})

			return res
		} catch (error) {
			const res = new ReplyDTO<null>(null, new ErrorMsg(500, errorMsg.e500, error))

			return res
		}
	}

	async getByEmail(inputs: GetArtistByEmailInputDTO): Promise<GetArtistByEmailReplyDTO> {
		const email = inputs.data

		try {
			const data = await dbClient.userAuth.findUnique({
				where: {
					email: email,
				},
				select: {
					artists: {
						select: {
							id: true,
							name: true,
							bio: true,
							members: true,
							genres: true,
							avatarUrl: true,
						},
					},
				},
			})

			// Return Response

			const res = new ReplyDTO<IArtist>({
				id: data?.artists[0].id,
				name: data?.artists[0].name,
				bio: null,
				members: data?.artists[0].members,
				genres: [
					data?.artists[0].genres[0],
					data?.artists[0].genres[1],
					data?.artists[0].genres[2],
				],
				avatarUrl: null,
			})

			return res
		} catch (error) {
			const res = new ReplyDTO<null>(null, new ErrorMsg(500, errorMsg.e500, error))

			return res
		}
	}

	async getAll(): Promise<GetAllArtistsReplyDTO> {
		try {
			// Calling DB
			const data = await dbClient.artist.findMany({
				select: {
					id: true,
					name: true,
					genres: true,
					avatarUrl: true,
				},
			})

			// Reorganize
			const list = data.map((artist): ArtistsListItem => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// Return Response
			const res = new ReplyDTO<ArtistsList>(list)

			return res
		} catch (error) {
			const res = new ReplyDTO<ArtistsList>([], new ErrorMsg(500, errorMsg.e500, error))

			return res
		}
	}

	async findManyByGenre(inputs: FindArtistsByGenreInputDTO): Promise<FindArtistsByGenreReplyDTO> {
		const genre: string = inputs.data

		try {
			const data = await dbClient.artist.findMany({
				where: {
					genres: { has: genre },
				},
				select: {
					id: true,
					name: true,
					genres: true,
					avatarUrl: true,
				},
			})

			const list = data.map((artist): ArtistsListItem => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// Return Response
			const res = new ReplyDTO<ArtistsList>(list)

			return res
		} catch (error) {
			const res = new ReplyDTO<ArtistsList>([], new ErrorMsg(500, errorMsg.e500, error))

			return res
		}
	}
}
