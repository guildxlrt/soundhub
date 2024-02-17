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
	ItemStatusType,
} from "Shared"
import { RawFile, Artist, UserAuth, File } from "Domain"

export interface ArtistsRepository {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: File
	): Promise<INewArtistSuccess>
	update(data: Artist, deleteLogo?: boolean, file?: File): Promise<boolean>
	setStatus(id: ArtistProfileID, status: ItemStatusType): Promise<boolean>
	getByID(id: ArtistProfileID): Promise<GetArtistDTO>
	getByEmail(email: UserEmail): Promise<GetArtistDTO>
	search(genre: GenreType, country: string): Promise<GetArtistShortDTO[]>
}

export interface ExtBackArtistsRepos {
	checkRights(id: number, authID: number): Promise<boolean>
	getAuths(id: ArtistProfileID): Promise<IGetArtistAuthsSuccess>
	getNames(ids: ArtistProfileID[]): Promise<IArtistName[]>
	findByAuthID(id: UserAuthID): Promise<IfindByAuthIDSuccess>
	getLogoPath(id: ArtistProfileID): Promise<string | null>
	setLogoPath(path: string | null, id: ArtistProfileID): Promise<boolean>
}

export interface ExtFrontArtistsRepos {}

export interface ArtistsBackendRepos extends ArtistsRepository, ExtBackArtistsRepos {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
		},
		file?: RawFile
	): Promise<INewArtistBackSucces>
	update(data: Artist, deleteLogo?: boolean, file?: RawFile): Promise<boolean>
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
	update(data: Artist, deleteLogo?: boolean, file?: RawFile): Promise<boolean>
}
