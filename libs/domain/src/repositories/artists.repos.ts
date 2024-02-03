import {
	ProfileID,
	GenreType,
	ArtistShortDTO,
	ArtistShortestDTO,
	UserEmail,
	UserPassword,
	UserAuthID,
	INewArtistSuccess,
	INewArtistBackSucces,
	IFindByAuthIDSuccess,
	IGetArtistAuthsSuccess,
	IGetArtistNameSuccess,
	IArtistName,
} from "Shared"
import { StreamFile, Artist, UserAuth, RawFile, File } from "Domain"

export interface ArtistsRepository {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: File
	): Promise<INewArtistSuccess>
	update(data: Artist, delAvatar?: boolean, file?: File): Promise<boolean>
	getByID(id: ProfileID): Promise<ArtistShortDTO>
	getByEmail(email: UserEmail): Promise<ArtistShortDTO>
	getAll(): Promise<ArtistShortestDTO[]>
	findManyByGenre(genre: GenreType): Promise<ArtistShortestDTO[]>
}

export interface ExtBackArtistsRepos {
	verifyExistence(id: ProfileID): Promise<ProfileID>
	getAuths(id: ProfileID): Promise<IGetArtistAuthsSuccess>
	getNames(ids: ProfileID[]): Promise<IArtistName[]>
	findByAuthID(id: UserAuthID): Promise<IFindByAuthIDSuccess>
	getAvatarPath(id: ProfileID): Promise<string | null>
	setAvatarPath(path: string | null, id: ProfileID): Promise<boolean>
}

export interface ExtFrontArtistsRepos {}

export interface ArtistsBackendRepos extends ArtistsRepository, ExtBackArtistsRepos {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
		},
		file?: StreamFile
	): Promise<INewArtistBackSucces>
	update(data: Artist, delAvatar?: boolean, file?: StreamFile): Promise<boolean>
}

export interface ArtistsFrontendRepos extends ArtistsRepository, ExtFrontArtistsRepos {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: RawFile
	): Promise<boolean>
	update(data: Artist, delAvatar?: boolean, file?: RawFile): Promise<boolean>
}
