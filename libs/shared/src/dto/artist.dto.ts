import {
	ArtistId,
	GenreType,
	IArtistInfoSucc,
	IArtistsListSucc,
	GenresArray,
	UserEmail,
	UserPassword,
	INewArtistSucc,
} from "../utils"
import { ReplyDTO } from "./layers"

// CREATE ARTIST
export interface CreateArtistReqDTO {
	profile: {
		name: string
		bio: string
		members: string[]
		genres: GenresArray
	}
	auth: {
		email: UserEmail
		password: UserPassword
	}
	authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
}
export class CreateArtistReplyDTO extends ReplyDTO<INewArtistSucc> {}

// MODIFY ARTIST //
export interface ModifyArtistReqDTO {
	id: ArtistId | undefined
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar: boolean | null // true = add, null = no changes, false = remove
}
export class ModifyArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID

export class GetArtistByIdReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

// ARTIST BY EMAIL
export interface GetArtistByEmailReqDTO {
	email: UserEmail
}
export class GetArtistByEmailReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

// GET ALL
export class GetAllArtistsReplyDTO extends ReplyDTO<IArtistsListSucc> {}

// ARTISTS BY GENRE
export type FindArtistsByGenreReqDTO = GenreType

export class FindArtistsByGenreReplyDTO extends ReplyDTO<IArtistsListSucc> {}
