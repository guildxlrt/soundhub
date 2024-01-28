import {
	ProfileID,
	GenreType,
	IArtistInfoSucc,
	IArtistsListSucc,
	INewArtistSucc,
	ReplyLayer,
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
	): Promise<ReplyLayer<INewArtistSucc>>
	update(data: Artist, file?: File): Promise<ReplyLayer<boolean>>
	getByID(id: ProfileID): Promise<ReplyLayer<IArtistInfoSucc>>
	getByEmail(email: UserEmail): Promise<ReplyLayer<IArtistInfoSucc>>
	getAll(): Promise<ReplyLayer<IArtistsListSucc>>
	findManyByGenre(genre: GenreType): Promise<ReplyLayer<IArtistsListSucc>>
}

export interface ArtistsAddBackRepos {
	getByAuth(id: UserAuthID): Promise<{ profile: Artist; profileType: UserProfileType }>
}

export interface ArtistsAddFrontRepos {}

export interface ArtistsBackendRepos extends ArtistsRepository, ArtistsAddBackRepos {}
