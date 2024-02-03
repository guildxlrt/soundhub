import { ArtistsBackendRepos, Artist, UserAuth } from "Domain"
import {
	ErrorMsg,
	ArtistShortDTO,
	ArtistShortestDTO,
	GenreType,
	ProfileID,
	UserEmail,
	htmlError,
	UserAuthID,
	ArtistDTO,
	INewArtistBackSucces,
	IFindByAuthIDSuccess,
	IGetArtistAuthsSuccess,
	IGetArtistNameSuccess,
	IArtistName,
} from "Shared"
import { dbClient } from "../prisma"
import { DatabaseErrorHandler } from "../utils"

export class ArtistsImplement implements ArtistsBackendRepos {
	private userAuth = dbClient.userAuth
	private artist = dbClient.artist

	async create(data: { profile: Artist; userAuth: UserAuth }): Promise<INewArtistBackSucces> {
		try {
			const { name, bio, members, genres } = data.profile
			const { email, password } = data.userAuth

			// PERSIST
			const newUser = await this.userAuth.create({
				data: {
					email: email as string,
					password: password as string,
					artists: {
						create: {
							name: name,
							bio: bio,
							members: members,
							genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
						},
					},
				},
				select: {
					id: true,
					artists: {
						select: {
							id: true,
						},
					},
				},
			})

			if (!newUser?.id) throw ErrorMsg.htmlError(htmlError[401])
			if (!newUser?.id) throw ErrorMsg.htmlError(htmlError[401])

			// return
			const id = newUser?.artists[0].id
			const authID = newUser?.id

			return {
				id: id,
				authID: authID,
			}
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async update(data: Artist): Promise<boolean> {
		try {
			const { name, bio, members, genres, id } = data

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

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getByID(id: ProfileID): Promise<ArtistShortDTO> {
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

			return ArtistShortDTO.createFromData(user)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getByEmail(email: UserEmail): Promise<ArtistShortDTO> {
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
			return ArtistShortDTO.createFromData(user)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<ArtistShortestDTO[]> {
		try {
			const artists = await this.artist.findMany({
				select: {
					id: true,
					name: true,
					genres: true,
					avatarPath: true,
				},
			})

			// Reorganize
			return ArtistShortestDTO.createArrayFromData(artists)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<ArtistShortestDTO[]> {
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

			return ArtistShortestDTO.createArrayFromData(artists)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async verifyExistence(id: ProfileID): Promise<ProfileID> {
		try {
			const user = await this.artist.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
				},
			})

			return user.id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to authentificate")
		}
	}

	async getAuths(id: ProfileID): Promise<IGetArtistAuthsSuccess> {
		try {
			const user = await this.artist.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					user_auth_id: true,
				},
			})

			return user
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to authentificate")
		}
	}

	async getNames(ids: ProfileID[]): Promise<IArtistName[]> {
		const results = await Promise.all(
			ids.map(async (id) => {
				return await this.artist.findMany({
					where: {
						id: id,
					},
					select: {
						id: true,
						name: true,
					},
				})
			})
		)
		return results.flat(Infinity) as IArtistName[]
	}

	async findByAuthID(userAuthID: UserAuthID): Promise<IFindByAuthIDSuccess> {
		try {
			const user = await this.artist.findUniqueOrThrow({
				where: {
					user_auth_id: userAuthID,
				},
			})

			const artistDTO = ArtistDTO.createFromData(user)

			return {
				profile: artistDTO as ArtistDTO,
				profileType: "artist",
			}
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to authentificate")
		}
	}

	async getAvatarPath(id: ProfileID): Promise<string | null> {
		try {
			const data = await this.artist.findUniqueOrThrow({
				where: {
					user_auth_id: id,
				},
				select: {
					avatarPath: true,
				},
			})
			return data.avatarPath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}

	async setAvatarPath(path: string | null, id: ProfileID): Promise<boolean> {
		try {
			await this.artist.update({
				where: {
					id: id,
				},
				data: {
					avatarPath: path,
				},
			})
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
