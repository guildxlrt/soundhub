import { ArtistId, GenreType, IArtistInfoLong, IArtistsList, GenresArray } from "Shared-utils"
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
		email: string
		confirmEmail: string
		password: string
		confirmPass: string
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
	id: number
}
export class GetArtistByIdReplyDTO extends ReplyDTO<IArtistInfoLong | null> {}

// ARTIST BY EMAIL
export interface GetArtistByEmailInputDTO {
	email: string
}
export class GetArtistByEmailReplyDTO extends ReplyDTO<IArtistInfoLong | null> {}

// GET ALL
export class GetAllArtistsReplyDTO extends ReplyDTO<IArtistsList> {}

// ARTISTS BY GENRE
export type FindArtistsByGenreInputDTO = GenreType

export class FindArtistsByGenreReplyDTO extends ReplyDTO<IArtistsList> {}
