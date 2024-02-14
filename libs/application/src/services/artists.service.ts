import {
	Artist,
	ExtBackArtistsRepos,
	ExtFrontArtistsRepos,
	ArtistsRepository,
	File,
	UserAuth,
} from "Domain"
import {
	ArtistProfileID,
	UserEmail,
	UserPassword,
	GetArtistDTO,
	GetArtistShortDTO,
	GenreType,
	UserAuthID,
	ErrorHandler,
	INewArtistSuccess,
	IfindByAuthIDSuccess,
	IGetArtistAuthsSuccess,
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
	async update(profile: Artist, delLogo?: boolean, file?: File): Promise<boolean> {
		try {
			return await this.service.update(profile, delLogo, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getPublicStatus(id: ArtistProfileID): Promise<boolean> {
		try {
			return await this.service.getPublicStatus(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setPublicStatus(id?: ArtistProfileID, isPublic?: boolean): Promise<boolean> {
		try {
			return await this.service.setPublicStatus(id, isPublic)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getByID(id: ArtistProfileID): Promise<GetArtistDTO> {
		try {
			return await this.service.getByID(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getByEmail(email: UserEmail): Promise<GetArtistDTO> {
		try {
			return await this.service.getByEmail(email)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getAll(): Promise<GetArtistShortDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByGenre(genre: GenreType): Promise<GetArtistShortDTO[]> {
		try {
			return await this.service.findByGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	// BACKEND
	async verifyExistence(id: ArtistProfileID): Promise<ArtistProfileID> {
		try {
			return await this.service.verifyExistence(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getAuths(id: ArtistProfileID): Promise<IGetArtistAuthsSuccess> {
		try {
			return await this.service.getAuths(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getNames(ids: ArtistProfileID[]): Promise<IArtistName[]> {
		try {
			return await this.service.getNames(ids)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByAuthID(id: UserAuthID): Promise<IfindByAuthIDSuccess> {
		try {
			return await this.service.findByAuthID(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getLogoPath(id: ArtistProfileID): Promise<string | null> {
		try {
			return await this.service.getLogoPath(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async setLogoPath(path: string | null, id: ArtistProfileID): Promise<boolean> {
		try {
			return await this.service.setLogoPath(path, id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
