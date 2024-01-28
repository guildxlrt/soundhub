import { ArtistsBackendRepos, Artist, UserAuth } from "Domain"
import {
	ErrorMsg,
	IArtistInfoSucc,
	IArtistsListSucc,
	IArtistsListItemSucc,
	GenreType,
	ProfileID,
	UserEmail,
	htmlError,
	INewArtistSucc,
	UserPassword,
	UserAuthID,
	UserProfileType,
} from "Shared"
import { PassEncryptor, DbErrHandler, Reply } from "../utils"
import { dbClient } from "../database"

export class ArtistsImplement implements ArtistsBackendRepos {
	private userAuth = dbClient.userAuth
	private artist = dbClient.artist

	async create(data: {
		profile: Artist
		userAuth: UserAuth
		authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
	}): Promise<Reply<INewArtistSucc>> {
		try {
			const { name, bio, members, genres } = data.profile
			const { email, password } = data.userAuth
			const hashedPass = await PassEncryptor.hash(password)

			// PERSIST
			const newUserAuth = await this.userAuth.create({
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

			// // GET PROFILE
			// const getProfile = await GetID.profile(newUserAuth.id)
			// if (!getProfile) throw ErrorMsg.htmlError(htmlError[404])

			// // Storing files
			// const store = filePath.origin.image + file?.filename
			// const destination = filePath.store.artist + file?.filename
			// const avatarPath = await FileManipulator.move(store, destination)

			// await this.artist.update({
			// 	where: {
			// 		id: getProfile,
			// 	},
			// 	data: {
			// 		avatarPath: avatarPath,
			// 	},
			// })

			// // TOKEN GEN
			// const expires = authExpires.oneYear
			// const userCookie = new UserTokenData(newUserAuth.id, getProfile as number, "artist")

			// const token = await Token.generate(userCookie, expires)

			// return cookie
			return new Reply<any>({})
		} catch (error) {
			const res = new Reply<INewArtistSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))

			// Email must be unique
			DbErrHandler.uniqueEmail(error, res)

			return res
		}
	}

	async update(data: Artist): Promise<Reply<boolean>> {
		try {
			const { name, bio, members, genres, id } = data

			// // AUTH
			// const getProfile = await GetID.profile(user_auth_id as number)
			// if (user_auth_id !== getProfile) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			await this.artist.update({
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

			// // STORING FILE
			// if (file) {
			// 	// move file
			// 	const store = filePath.origin.image + file?.filename
			// 	const destination = filePath.store.artist + file?.filename
			// 	const avatarPath = await FileManipulator.move(store, destination)

			// 	// delete old file
			// 	const oldAvatarPath = await this.artist.findUniqueOrThrow({
			// 		where: {
			// 			id: getProfile,
			// 		},
			// 		select: {
			// 			avatarPath: true,
			// 		},
			// 	})
			// 	await FileManipulator.delete(oldAvatarPath?.avatarPath as string)

			// 	// save new path
			// 	await this.artist.update({
			// 		where: {
			// 			id: id as number,
			// 		},
			// 		data: {
			// 			// avatarPath: avatarPath,
			// 		},
			// 	})
			// }

			return new Reply(true)
		} catch (error) {
			return new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async getByID(id: ProfileID): Promise<Reply<IArtistInfoSucc>> {
		try {
			const user = await this.artist.findUniqueOrThrow({
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
			const user = await this.userAuth.findUniqueOrThrow({
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
			const artists = await this.artist.findMany({
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

			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async findManyByGenre(genre: GenreType): Promise<Reply<IArtistsListSucc>> {
		try {
			const artists = await this.artist.findMany({
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

			return new Reply<IArtistsListSucc>(list)
		} catch (error) {
			return new Reply<IArtistsListSucc>([], ErrorMsg.htmlError(htmlError[500]))
		}
	}

	async getByAuth(
		userAuthID: UserAuthID
	): Promise<{ profile: Artist; profileType: UserProfileType }> {
		try {
			const user = await this.artist.findUniqueOrThrow({
				where: {
					user_auth_id: userAuthID,
				},
			})

			return {
				profile: user as Artist,
				profileType: "artist",
			}
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
