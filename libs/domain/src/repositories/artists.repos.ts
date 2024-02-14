import {
	ArtistProfileID,
	GenreType,
	GetArtistDTO,
	GetArtistShortDTO,
	UserEmail,
	UserPassword,
	UserAuthID,
	INewArtistSuccess,
	INewArtistBackSucces,
	IfindByAuthIDSuccess,
	IGetArtistAuthsSuccess,
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
	update(data: Artist, delLogo?: boolean, file?: File): Promise<boolean>
	setPublicStatus(id?: number, isPublic?: boolean): Promise<boolean>
	getByID(id: ArtistProfileID): Promise<GetArtistDTO>
	getByEmail(email: UserEmail): Promise<GetArtistDTO>
	getAll(): Promise<GetArtistShortDTO[]>
	findByGenre(genre: GenreType): Promise<GetArtistShortDTO[]>
}

export interface ExtBackArtistsRepos {
	getPublicStatus(id: ArtistProfileID): Promise<boolean>
	verifyExistence(id: ArtistProfileID): Promise<ArtistProfileID>
	getAuths(id: ArtistProfileID): Promise<IGetArtistAuthsSuccess>
	getNames(ids: ArtistProfileID[]): Promise<IArtistName[]>
	findByAuthID(id: UserAuthID): Promise<IfindByAuthIDSuccess>
	getLogoPath(id: ArtistProfileID): Promise<string | null>
	setLogoPath(path: string | null, id: ArtistProfileID): Promise<boolean>
}

export interface ExtFrontArtistsRepos {}

export interface ArtistsBackendRepos extends ArtistsRepository, ExtBackArtistsRepos {
	setPublicStatus(id: ArtistProfileID, isPublic: boolean): Promise<boolean>
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
		},
		file?: StreamFile
	): Promise<INewArtistBackSucces>
	update(data: Artist, delLogo?: boolean, file?: StreamFile): Promise<boolean>
}

export interface ArtistsFrontendRepos extends ArtistsRepository, ExtFrontArtistsRepos {
	setPublicStatus(id?: number, isPublic?: boolean): Promise<boolean>
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: RawFile
	): Promise<boolean>
	update(data: Artist, delLogo?: boolean, file?: RawFile): Promise<boolean>
}
