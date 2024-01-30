import {
	ProfileID,
	GenreType,
	ArtistShortDTO,
	ArtistShortestDTO,
	UserEmail,
	UserPassword,
	UserProfileType,
	UserAuthID,
	ArtistDTO,
	INewArtistSucces,
	INewArtistBackSucces,
} from "Shared"
import { File, Artist, UserAuth } from "Domain"

export interface ArtistsRepository {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: File
	): Promise<INewArtistSucces>
	update(data: Artist, delAvatar?: boolean, file?: File): Promise<boolean>
	getByID(id: ProfileID): Promise<ArtistShortDTO>
	getByEmail(email: UserEmail): Promise<ArtistShortDTO>
	getAll(): Promise<ArtistShortestDTO[]>
	findManyByGenre(genre: GenreType): Promise<ArtistShortestDTO[]>
}

export interface ArtistsAddBackRepos {
	findByAuthID(id: UserAuthID): Promise<{ profile: ArtistDTO; profileType: UserProfileType }>
	getAuths(id: ProfileID): Promise<{
		id: number
		user_auth_id: number
	}>
	getAvatarPath(id: ProfileID): Promise<string | null>
	setAvatarPath(path: string | null, id: ProfileID): Promise<boolean>
}

export interface ArtistsAddFrontRepos {}

export interface ArtistsBackendRepos extends ArtistsRepository, ArtistsAddBackRepos {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
		},
		file?: File
	): Promise<INewArtistBackSucces>
}

export interface ArtistsFrontendRepos extends ArtistsRepository, ArtistsAddFrontRepos {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: File
	): Promise<boolean>
}
