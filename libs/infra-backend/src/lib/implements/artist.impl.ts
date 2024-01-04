import {
	ArtistsRepository,
	EmailParams,
	GenreParams,
	IdParams,
	ModifyArtistParams,
	NewArtistParams,
} from "Domain"
import {
	ModifyArtistReplyDTO,
	GetArtistByIdReplyDTO,
	GetArtistByEmailReplyDTO,
	GetAllArtistsReplyDTO,
	FindArtistsByGenreReplyDTO,
	ReplyDTO,
} from "Dto"
import {
	ErrorMsg,
	IArtistInfoSucc,
	IArtistsListSucc,
	IArtistInfoShortSucc,
	errorMsg,
	INewArtistSucc,
} from "Shared-utils"
import { dbClient, dbErrHandler } from "../db-client"

export class ArtistsImplement implements ArtistsRepository {
	async create(inputs: NewArtistParams): Promise<ReplyDTO<INewArtistSucc>> {
		const { name, bio, members, genres } = inputs.data.profile
		const { email, password } = inputs.data.auths

		try {
			// Storing files
			// ...

			// Persist data
			const data = await dbClient.userAuth.create({
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
			return new ReplyDTO<{ message: string; userAuthId: number }>({
				message: `Welcome, ${name} !!`,
				userAuthId: data.id,
			})
		} catch (error) {
			const res = new ReplyDTO<{ message: string; userAuthId: number }>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			// Email must be unique
			dbErrHandler.uniqueEmail(error, res)

			return res
		}
	}

	async modify(inputs: ModifyArtistParams): Promise<ModifyArtistReplyDTO> {
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

	async getById(inputs: IdParams): Promise<GetArtistByIdReplyDTO> {
		const id = inputs.id

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
			const res = new ReplyDTO<IArtistInfoSucc>({
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

	async getByEmail(inputs: EmailParams): Promise<GetArtistByEmailReplyDTO> {
		const email = inputs.email

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

			const res = new ReplyDTO<IArtistInfoSucc>({
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
			const list = data.map((artist): IArtistInfoShortSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// Return Response
			const res = new ReplyDTO<IArtistsListSucc>(list)

			return res
		} catch (error) {
			const res = new ReplyDTO<IArtistsListSucc>([], new ErrorMsg(500, errorMsg.e500, error))

			return res
		}
	}

	async findManyByGenre(inputs: GenreParams): Promise<FindArtistsByGenreReplyDTO> {
		const genre: string = inputs.genre

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

			const list = data.map((artist): IArtistInfoShortSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// Return Response
			const res = new ReplyDTO<IArtistsListSucc>(list)

			return res
		} catch (error) {
			const res = new ReplyDTO<IArtistsListSucc>([], new ErrorMsg(500, errorMsg.e500, error))

			return res
		}
	}
}
