import {
	Artist,
	ExtBackArtistsRepos,
	ExtFrontArtistsRepos,
	ArtistsRepository,
	File,
	UserAuth,
} from "Domain"
import {
	ProfileID,
	UserEmail,
	UserPassword,
	ArtistShortDTO,
	ArtistShortestDTO,
	GenreType,
	UserAuthID,
	ErrorHandler,
	INewArtistSuccess,
	IFindByAuthIDSuccess,
	IGetArtistAuthsSuccess,
	IGetArtistNameSuccess,
	IArtistName,
} from "Shared"

interface IArtistsService extends ArtistsRepository, ExtBackArtistsRepos, ExtFrontArtistsRepos {}

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
	): Promise<INewArtistSuccess> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async update(profile: Artist, delAvatar?: boolean, file?: File): Promise<boolean> {
		try {
			return await this.service.update(profile, delAvatar, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getByID(id: ProfileID): Promise<ArtistShortDTO> {
		try {
			return await this.service.getByID(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getByEmail(email: UserEmail): Promise<ArtistShortDTO> {
		try {
			return await this.service.getByEmail(email)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<ArtistShortestDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findManyByGenre(genre: GenreType): Promise<ArtistShortestDTO[]> {
		try {
			return await this.service.findManyByGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	// BACKEND
	async verifyExistence(id: ProfileID): Promise<ProfileID> {
		try {
			return await this.service.verifyExistence(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAuths(id: ProfileID): Promise<IGetArtistAuthsSuccess> {
		try {
			return await this.service.getAuths(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getNames(ids: ProfileID[]): Promise<IArtistName[]> {
		try {
			return await this.service.getNames(ids)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByAuthID(id: UserAuthID): Promise<IFindByAuthIDSuccess> {
		try {
			return await this.service.findByAuthID(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAvatarPath(id: ProfileID): Promise<string | null> {
		try {
			return await this.service.getAvatarPath(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async setAvatarPath(path: string | null, id: ProfileID): Promise<boolean> {
		try {
			return await this.service.setAvatarPath(path, id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
