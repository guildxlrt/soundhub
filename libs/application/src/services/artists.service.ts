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
	ItemStatusType,
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
	async update(profile: Artist, deleteLogo?: boolean, file?: File): Promise<boolean> {
		try {
			return await this.service.update(profile, deleteLogo, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setStatus(id: ArtistProfileID, status: ItemStatusType): Promise<boolean> {
		try {
			return await this.service.setStatus(id, status)
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
	async search(genre: GenreType, country: string): Promise<GetArtistShortDTO[]> {
		try {
			return await this.service.search(genre, country)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async checkRights(id: number, authID: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, authID)
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
