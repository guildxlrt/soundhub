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
	ArtistShortDTO,
	ArtistShortestDTO,
	GenreType,
	UserAuthID,
	ErrorHandler,
	ArtistDTO,
	INewArtistSucces,
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
	): Promise<INewArtistSucces> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async update(data: Artist, delAvatar?: boolean, file?: File): Promise<boolean> {
		try {
			return await this.service.update(data, delAvatar, file)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async getByID(id: ProfileID): Promise<ArtistShortDTO> {
		try {
			return await this.service.getByID(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async getByEmail(email: UserEmail): Promise<ArtistShortDTO> {
		try {
			return await this.service.getByEmail(email)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async getAll(): Promise<ArtistShortestDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async findManyByGenre(genre: GenreType): Promise<ArtistShortestDTO[]> {
		try {
			return await this.service.findManyByGenre(genre)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	// BACKEND
	async findByAuthID(
		id: UserAuthID
	): Promise<{ profile: ArtistDTO; profileType: UserProfileType }> {
		try {
			return await this.service.findByAuthID(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async getAuths(id: ProfileID): Promise<{
		id: number
		user_auth_id: number
	}> {
		try {
			return await this.service.getAuths(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async getAvatarPath(id: ProfileID): Promise<string | null> {
		try {
			return await this.service.getAvatarPath(id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
	async setAvatarPath(path: string | null, id: ProfileID): Promise<boolean> {
		try {
			return await this.service.setAvatarPath(path, id)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
