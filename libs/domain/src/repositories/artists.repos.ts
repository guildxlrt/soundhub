import {
	ProfileID,
	GenreType,
	IArtistInfoSucc,
	IArtistsListSucc,
	INewArtistSucc,
	UserEmail,
	UserPassword,
	UserProfileType,
	UserAuthID,
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
	): Promise<INewArtistSucc>
	update(data: Artist, file?: File): Promise<boolean>
	getByID(id: ProfileID): Promise<IArtistInfoSucc>
	getByEmail(email: UserEmail): Promise<IArtistInfoSucc>
	getAll(): Promise<IArtistsListSucc>
	findManyByGenre(genre: GenreType): Promise<IArtistsListSucc>
}

export interface ArtistsAddBackRepos {
	getByAuth(id: UserAuthID): Promise<{ profile: Artist; profileType: UserProfileType }>
}

export interface ArtistsAddFrontRepos {}

export interface ArtistsBackendRepos extends ArtistsRepository, ArtistsAddBackRepos {}
