import { Artist, ArtistsRepository, UserAuth } from "Domain"
import {
	ErrorMsg,
	IArtistInfoSucc,
	IArtistsListSucc,
	IArtistsListItemSucc,
	INewArtistSucc,
	GenreType,
	ArtistID,
	UserEmail,
	FileType,
	apiError,
	Cookie,
	UserTokenData,
} from "Shared"
import {
	PassEncryptor,
	DbErrHandler,
	FileManipulator,
	filePath,
	Reply,
	Token,
	authExpires,
} from "../../utils"
import { GetID, dbClient } from "../../database"

export class ArtistsImplement implements ArtistsRepository {
	async create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm: undefined
		},
		file?: FileType
	): Promise<Reply<Cookie>> {
		try {
			const { name, bio, members, genres } = data.profile
			const { email, password } = data.userAuth
			const hashedPass = await PassEncryptor.hash(password)

			// Storing files
			const origin = filePath.origin.image + file?.filename
			const store = filePath.store.artist + file?.filename
			FileManipulator.move(origin, store)

			// PERSIST
			const newUser = await dbClient.userAuth.create({
				data: {
					email: email,
					password: hashedPass,
					artists: {
						create: {
							name: name,
							bio: bio,
							members: members,
							genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
							avatarPath: store,
						},
					},
				},
			})

			if (!newUser?.id) throw ErrorMsg.apiError(apiError[401])

			// RESPONSE
			const getProfile = await GetID.user(newUser.id, "profile")
			if (!getProfile) throw ErrorMsg.apiError(apiError[404])

			// token gen
			const expires = authExpires.oneYear
			const userCookie = new UserTokenData(newUser.id, getProfile as number, "artist")

			const token = Token.generate(userCookie, expires)

			// return cookie
			return new Reply<Cookie>(
				new Cookie("jwt", token as string, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
			)
		} catch (error) {
			const res = new Reply<Cookie>(undefined, ErrorMsg.apiError(apiError[500]))

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
			const authID = await GetID.user(id as number, "auth")

			if (userAuth !== authID) throw ErrorMsg.apiError(apiError[403])

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
					avatarPath: fileStore,
				},
			})

			// RESPONSE
			return new Reply(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.apiError(apiError[500]))
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
					avatarPath: true,
				},
			})

			// RESPONSE
			return new Reply<IArtistInfoSucc>({
				id: id,
				name: user?.name,
				bio: null,
				members: user?.members,
				genres: [user?.genres[0], user?.genres[1], user?.genres[2]],
				avatarPath: null,
			})
		} catch (error) {
			return new Reply<IArtistInfoSucc>(undefined, ErrorMsg.apiError(apiError[500]))
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
							avatarPath: true,
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
				avatarPath: null,
			})
		} catch (error) {
			return new Reply<IArtistInfoSucc>(undefined, ErrorMsg.apiError(apiError[500]))
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
					avatarPath: true,
				},
			})

			// Reorganize
			const list = artists.map((artist): IArtistsListItemSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarPath: null,
				}
			})

			// RESPONSE
			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], ErrorMsg.apiError(apiError[500]))
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
					avatarPath: true,
				},
			})

			const list = artists.map((artist): IArtistsListItemSucc => {
				return {
					id: artist.id,
					name: artist.name,
					genres: [artist.genres[0], artist.genres[1], artist.genres[2]],
					avatarPath: null,
				}
			})

			// RESPONSE
			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], ErrorMsg.apiError(apiError[500]))
		}
	}
}
