import {
	Artist,
	ArtistsAddBackRepos,
	ArtistsAddFrontRepos,
	ArtistsRepository,
	File,
	UserAuth,
} from "Domain"
import {
	ProfileID,
	UserEmail,
	UserPassword,
	UserProfileType,
	IArtistInfoSucc,
	IArtistsListSucc,
	GenreType,
	UserAuthID,
	ErrorHandler,
	UserTokenData,
} from "Shared"

interface IArtistsService extends ArtistsRepository, ArtistsAddBackRepos, ArtistsAddFrontRepos {}

export class ArtistsService implements IArtistsService {
	private service: IArtistsService

	constructor(service: IArtistsService) {
		this.service = service
	}

	// SERVIVES
	async create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: File
	): Promise<{
		data: Artist
		userTokenData?: UserTokenData
	}> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async update(data: Artist, avatarDel?: boolean, file?: File): Promise<boolean> {
		try {
			return await this.service.update(data, avatarDel, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getByID(id: ProfileID): Promise<IArtistInfoSucc> {
		try {
			return await this.service.getByID(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getByEmail(email: UserEmail): Promise<IArtistInfoSucc> {
		try {
			return await this.service.getByEmail(email)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<IArtistsListSucc> {
		{
			try {
				return await this.service.getAll()
			} catch (error) {
				throw ErrorHandler.handle(error)
			}
		}
	}
	async findManyByGenre(genre: GenreType): Promise<IArtistsListSucc> {
		{
			try {
				return await this.service.findManyByGenre(genre)
			} catch (error) {
				throw ErrorHandler.handle(error)
			}
		}
	}
	// BACKEND
	async getByAuth(id: UserAuthID): Promise<{ profile: Artist; profileType: UserProfileType }> {
		{
			try {
				return await this.service.getByAuth(id)
			} catch (error) {
				throw ErrorHandler.handle(error)
			}
		}
	}
	async getAvatarPath(id: ProfileID): Promise<string | null> {
		{
			try {
				return await this.service.getAvatarPath(id)
			} catch (error) {
				throw ErrorHandler.handle(error)
			}
		}
	}
}
