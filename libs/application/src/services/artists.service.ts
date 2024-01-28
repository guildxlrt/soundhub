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
	ErrorMsg,
	UserEmail,
	UserPassword,
	UserProfileType,
	htmlError,
	ReplyLayer,
	INewArtistSucc,
	IArtistInfoSucc,
	IArtistsListSucc,
	GenreType,
	UserAuthID,
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
	): Promise<ReplyLayer<INewArtistSucc>> {
		try {
			return await this.service.create(data, file)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async update(data: Artist, file?: File): Promise<ReplyLayer<boolean>> {
		try {
			return await this.service.update(data, file)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getByID(id: ProfileID): Promise<ReplyLayer<IArtistInfoSucc>> {
		try {
			return await this.service.getByID(id)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getByEmail(email: UserEmail): Promise<ReplyLayer<IArtistInfoSucc>> {
		try {
			return await this.service.getByEmail(email)
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
	async getAll(): Promise<ReplyLayer<IArtistsListSucc>> {
		{
			try {
				return await this.service.getAll()
			} catch (error) {
				throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
			}
		}
	}
	async findManyByGenre(genre: GenreType): Promise<ReplyLayer<IArtistsListSucc>> {
		{
			try {
				return await this.service.findManyByGenre(genre)
			} catch (error) {
				throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
			}
		}
	}
	async getByAuth(id: UserAuthID): Promise<{ profile: Artist; profileType: UserProfileType }> {
		{
			try {
				return await this.service.getByAuth(id)
			} catch (error) {
				throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
			}
		}
	}
}
