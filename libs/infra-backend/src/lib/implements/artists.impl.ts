import { Artist, ArtistsRepository, UserAuth } from "Domain"
import {
	ErrorMsg,
	IArtistInfoSucc,
	IArtistsListSucc,
	IArtistsListItemSucc,
	apiErrorMsg,
	INewArtistSucc,
	GenreType,
	ArtistID,
	UserCookie,
	UserEmail,
	FileType,
} from "Shared"
import { dbClient, DbErrHandler, FileManipulator, filePath, GetID, Reply } from "../../assets"

export class ArtistsImplement implements ArtistsRepository {
	async create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm: undefined
			hashedPass?: string
		},
		file?: FileType
	): Promise<Reply<INewArtistSucc>> {
		try {
			const { name, bio, members, genres } = data.profile
			const { email } = data.userAuth
			const password = data.hashedPass as string

			// Storing files
			const origin = filePath.origin.image + file?.filename
			const store = filePath.store.artist + file?.filename
			FileManipulator.move(origin, store)

			// PERSIST
			const newUser = await dbClient.userAuth.create({
				data: {
					email: email,
					password: password,
					artists: {
						create: {
							name: name,
							bio: bio,
							members: members,
							genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
							avatarUrl: store,
						},
					},
				},
			})

			if (!newUser?.id) throw new ErrorMsg(401, apiErrorMsg.e401)

			// RESPONSE
			const getProfile = await dbClient.artist.findUnique({
				where: {
					user_auth_id: newUser.id,
				},
				select: {
					id: true,
				},
			})

			return new Reply<INewArtistSucc>({
				message: `Welcome, ${name} !!`,
				userCookie: new UserCookie(newUser.id, getProfile?.id as number, "artist"),
			})
		} catch (error) {
			const res = new Reply<INewArtistSucc>(
				undefined,
				new ErrorMsg(500, apiErrorMsg.e500, error)
			)

			// Email must be unique
			DbErrHandler.uniqueEmail(error, res)

			return res
		}
	}

	async update(
		data: { profile: Artist; userAuth?: number },
		file?: FileType
	): Promise<Reply<boolean>> {
		try {
			const { name, bio, members, genres, id } = data.profile
			const userAuth = data.userAuth

			// STORING FILE
			const fileOrigin = filePath.origin.image + file?.filename
			const fileStore = filePath.store.artist + file?.filename
			FileManipulator.move(fileOrigin, fileStore)

			// DELETE OLD FILE
			// ... get the id
			FileManipulator.delete("")

			// AUTH
			const authID = await GetID.auth(id as number)

			if (userAuth !== authID) throw new ErrorMsg(403, apiErrorMsg.e403)

			// PERSIST
			await dbClient.artist.update({
				where: {
					id: id as number,
				},
				data: {
					name: name,
					bio: bio,
					members: members,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					avatarUrl: fileStore,
				},
			})

			// RESPONSE
			return new Reply(true)
		} catch (error) {
			return new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async getByID(id: ArtistID): Promise<Reply<IArtistInfoSucc>> {
		try {
			const user = await dbClient.artist.findUnique({
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

			// RESPONSE
			return new Reply<IArtistInfoSucc>({
				id: id,
				name: user?.name,
				bio: null,
				members: user?.members,
				genres: [user?.genres[0], user?.genres[1], user?.genres[2]],
				avatarUrl: null,
			})
		} catch (error) {
			return new Reply<IArtistInfoSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async getByEmail(email: UserEmail): Promise<Reply<IArtistInfoSucc>> {
		try {
			const user = await dbClient.userAuth.findUnique({
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

			// RESPONSE
			return new Reply<IArtistInfoSucc>({
				id: user?.artists[0].id,
				name: user?.artists[0].name,
				bio: null,
				members: user?.artists[0].members,
				genres: [
					user?.artists[0].genres[0],
					user?.artists[0].genres[1],
					user?.artists[0].genres[2],
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
			const artists = await dbClient.artist.findMany({
				select: {
					id: true,
					name: true,
					genres: true,
					avatarUrl: true,
				},
			})

			// Reorganize
			const list = artists.map((artist): IArtistsListItemSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// RESPONSE
			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Reply<IArtistsListSucc>> {
		try {
			const artists = await dbClient.artist.findMany({
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

			const list = artists.map((artist): IArtistsListItemSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarUrl: null,
				}
			})

			// RESPONSE
			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
