import {
	ArtistId,
	GenreType,
	IArtistInfoSucc,
	IArtistsListSucc,
	GenresArray,
	UserEmail,
	UserPassword,
} from "Shared-utils"
import { ReplyDTO } from "../assets"

// CREATE ARTIST
export interface CreateArtistInputDTO {
	profile: {
		name: string
		bio: string
		members: string[]
		genres: GenresArray
		avatar: boolean
	}
	auths: {
		email: UserEmail
		confirmEmail: UserEmail
		password: UserPassword
		confirmPass: UserPassword
	}
}
export class CreateArtistReplyDTO extends ReplyDTO<{ message: string; userAuthId: number }> {}

// MODIFY ARTIST
export interface ModifyArtistInputDTO {
	id: ArtistId
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar: boolean | null // true = add, null = no changes, false = remove
}
export class ModifyArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID
export interface GetArtistByIdInputDTO {
	id: ArtistId
}
export class GetArtistByIdReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

// ARTIST BY EMAIL
export interface GetArtistByEmailInputDTO {
	email: UserEmail
}
export class GetArtistByEmailReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

// GET ALL
export class GetAllArtistsReplyDTO extends ReplyDTO<IArtistsListSucc> {}

// ARTISTS BY GENRE
export type FindArtistsByGenreInputDTO = GenreType

export class FindArtistsByGenreReplyDTO extends ReplyDTO<IArtistsListSucc> {}
