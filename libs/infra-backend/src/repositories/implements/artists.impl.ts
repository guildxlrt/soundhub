import { Artist, ArtistsRepository, UserAuth } from "Domain"
import {
	ErrorMsg,
	IArtistInfoSucc,
	IArtistsListSucc,
	IArtistsListItemSucc,
	GenreType,
	ArtistID,
	UserEmail,
	FileType,
	htmlError,
	UserTokenData,
	INewArtistSucc,
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
	): Promise<Reply<INewArtistSucc>> {
		try {
			const { name, bio, members, genres } = data.profile
			const { email, password } = data.userAuth
			const hashedPass = await PassEncryptor.hash(password)

			// PERSIST
			const newUserAuth = await dbClient.userAuth.create({
				data: {
					email: email,
					password: hashedPass,
					artists: {
						create: {
							name: name,
							bio: bio,
							members: members,
							genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
						},
					},
				},
			})

			if (!newUserAuth?.id) throw ErrorMsg.htmlError(htmlError[401])

			const getProfile = await GetID.profile(newUserAuth.id)
			if (!getProfile) throw ErrorMsg.htmlError(htmlError[404])

			// Storing files
			const store = filePath.origin.image + file?.filename
			const destination = filePath.store.artist + file?.filename
			const avatarPath = await FileManipulator.move(store, destination)

			await dbClient.artist.update({
				where: {
					id: getProfile,
				},
				data: {
					avatarPath: avatarPath,
				},
			})

			// RESPONSE
			// token gen
			const expires = authExpires.oneYear
			const userCookie = new UserTokenData(newUserAuth.id, getProfile as number, "artist")

			const token = Token.generate(userCookie, expires)

			// return cookie
			return new Reply<INewArtistSucc>(
				new INewArtistSucc("jwt", token as string, {
					maxAge: expires,
					httpOnly: true,
					sameSite: "lax",
					secure: false,
				})
			)
		} catch (error) {
			const res = new Reply<INewArtistSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))

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
			const userAuth = data.userAuth as number

			// AUTH
			const getProfile = await GetID.profile(userAuth)
			if (userAuth !== getProfile) throw ErrorMsg.htmlError(htmlError[403])

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
				},
			})

			// STORING FILE
			if (file) {
				// move file
				const store = filePath.origin.image + file?.filename
				const destination = filePath.store.artist + file?.filename
				const avatarPath = await FileManipulator.move(store, destination)

				// delete old file
				const oldAvatarPath = await dbClient.artist.findUnique({
					where: {
						id: getProfile,
					},
					select: {
						avatarPath: true,
					},
				})
				await FileManipulator.delete(oldAvatarPath?.avatarPath as string)

				// save new path
				await dbClient.artist.update({
					where: {
						id: id as number,
					},
					data: {
						avatarPath: avatarPath,
					},
				})
			}

			// RESPONSE
			return new Reply(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))
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
			return new Reply<IArtistInfoSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
			return new Reply<IArtistInfoSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
			return new Reply<IArtistsListSucc>([], ErrorMsg.htmlError(htmlError[500]))
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
			return new Reply<IArtistsListSucc>([], ErrorMsg.htmlError(htmlError[500]))
		}
	}
}
