import {
	ErrorMsg,
	IArtistInfoSucc,
	IArtistsListSucc,
	IArtistsListItemSucc,
	apiErrorMsg,
	INewArtistSucc,
	ArtistsRepository,
	EmailParams,
	GenreType,
	EntityId,
	ModifyArtistParams,
	NewArtistParams,
} from "Shared"
import { dbClient, dbErrHandler, Reply } from "../../assets"

export class ArtistsImplement implements ArtistsRepository {
	async create(inputs: NewArtistParams): Promise<Reply<INewArtistSucc>> {
		const { name, bio, members, genres } = inputs.profile
		const { email } = inputs.auth
		const password = inputs.hashedPass as string

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
			return new Reply<{ message: string; userAuthId: number }>({
				message: `Welcome, ${name} !!`,
				userAuthId: data.id,
			})
		} catch (error) {
			const res = new Reply<{ message: string; userAuthId: number }>(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)

			// Email must be unique
			dbErrHandler.uniqueEmail(error, res)

			return res
		}
	}

	async modify(inputs: ModifyArtistParams): Promise<Reply<boolean>> {
		try {
			const { name, bio, members, genres, id } = inputs.profile
			const { userAuth } = inputs
			console.log(userAuth)

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

			// Response
			return new Reply(true)
		} catch (error) {
			return new Reply<boolean>(false, new ErrorMsg(500, `Error: failed to persist`, error))
		}
	}

	async getById(id: EntityId): Promise<Reply<IArtistInfoSucc>> {
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

			// Response
			return new Reply<IArtistInfoSucc>({
				id: id,
				name: data?.name,
				bio: null,
				members: data?.members,
				genres: [data?.genres[0], data?.genres[1], data?.genres[2]],
				avatarUrl: null,
			})
		} catch (error) {
			return new Reply<IArtistInfoSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async getByEmail(inputs: EmailParams): Promise<Reply<IArtistInfoSucc>> {
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

			// Response

			return new Reply<IArtistInfoSucc>({
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
		} catch (error) {
			return new Reply<IArtistInfoSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async getAll(): Promise<Reply<IArtistsListSucc>> {
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
			const list = data.map((artist): IArtistsListItemSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// Response
			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Reply<IArtistsListSucc>> {
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

			const list = data.map((artist): IArtistsListItemSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// Response
			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
