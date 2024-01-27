import {
	ArtistID,
	FileType,
	GenreType,
	IArtistInfoSucc,
	IArtistsListSucc,
	INewArtistSucc,
	ReplyLayer,
	UserEmail,
	UserPassword,
} from "Shared"
import { Artist, UserAuth } from "Domain"

export interface ArtistsRepository {
	create(
		data: {
			profile: Artist
			userAuth: UserAuth
			authConfirm?: { confirmEmail: UserEmail; confirmPass: UserPassword }
		},
		file?: FileType
	): Promise<ReplyLayer<INewArtistSucc>>
	update(data: Artist, file?: FileType): Promise<ReplyLayer<boolean>>
	getByID(id: ArtistID): Promise<ReplyLayer<IArtistInfoSucc>>
	getByEmail(email: UserEmail): Promise<ReplyLayer<IArtistInfoSucc>>
	getAll(): Promise<ReplyLayer<IArtistsListSucc>>
	findManyByGenre(genre: GenreType): Promise<ReplyLayer<IArtistsListSucc>>
}
