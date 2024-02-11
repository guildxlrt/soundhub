import { ArtistsBackendRepos, Artist, UserAuth } from "Domain"
import {
	ErrorMsg,
	GetArtistDTO,
	GetArtistShortDTO,
	GenreType,
	ArtistProfileID,
	UserEmail,
	htmlError,
	UserAuthID,
	INewArtistBackSucces,
	IfindManyByAuthIDSuccess,
	IGetArtistAuthsSuccess,
	IArtistName,
} from "Shared"
import { dbClient } from "../database"
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
							isPublic: true,
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

	async setPublicStatus(id: ArtistProfileID, isPublic: boolean): Promise<boolean> {
		try {
			await this.artist.update({
				where: {
					id: id,
				},
				data: {
					isPublic: isPublic,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getByID(id: ArtistProfileID): Promise<GetArtistDTO> {
		try {
			const user = await this.artist.findUniqueOrThrow({
				where: {
					id: id,
				},
			})

			return GetArtistDTO.createFromData(user)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getByEmail(email: UserEmail): Promise<GetArtistDTO> {
		try {
			const user = await this.userAuth.findUniqueOrThrow({
				where: {
					email: email,
				},
			})
			return GetArtistDTO.createFromData(user)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetArtistShortDTO[]> {
		try {
			const artists = await this.artist.findMany({
				select: {
					id: true,
					name: true,
					genres: true,
				},
				where: {
					isPublic: true,
				},
			})

			// Reorganize
			return GetArtistShortDTO.createArrayFromData(artists)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findManyByGenre(genre: GenreType): Promise<GetArtistShortDTO[]> {
		try {
			const artists = await this.artist.findMany({
				where: {
					genres: { has: genre },
					isPublic: true,
				},
				select: {
					id: true,
					name: true,
					genres: true,
					avatarPath: true,
				},
			})

			return GetArtistShortDTO.createArrayFromData(artists)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getPublicStatus(id: ArtistProfileID): Promise<boolean> {
		try {
			const { isPublic } = await this.artist.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					isPublic: true,
				},
			})

			return isPublic
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async verifyExistence(id: ArtistProfileID): Promise<ArtistProfileID> {
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

	async getAuths(id: ArtistProfileID): Promise<IGetArtistAuthsSuccess> {
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

	async getNames(ids: ArtistProfileID[]): Promise<IArtistName[]> {
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

	async findManyByAuthID(userAuthID: UserAuthID): Promise<IfindManyByAuthIDSuccess> {
		try {
			const user = await this.artist.findUniqueOrThrow({
				where: {
					user_auth_id: userAuthID,
				},
			})

			const artistDTO = GetArtistDTO.createFromData(user)

			return {
				profile: artistDTO as GetArtistDTO,
				profileType: "artist",
			}
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to authentificate")
		}
	}

	async getAvatarPath(id: ArtistProfileID): Promise<string | null> {
		try {
			const { avatarPath } = await this.artist.findUniqueOrThrow({
				where: {
					user_auth_id: id,
				},
				select: {
					avatarPath: true,
				},
			})
			return avatarPath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}

	async setAvatarPath(path: string | null, id: ArtistProfileID): Promise<boolean> {
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
