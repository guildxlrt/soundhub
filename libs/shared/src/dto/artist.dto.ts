import {
	ArtistID,
	GenreType,
	IArtistInfoSucc,
	IArtistsListSucc,
	GenresArray,
	UserEmail,
	INewArtistSucc,
	IProfile,
	IUserAuth,
	IAuthConfirm,
} from "../utils"
import { ReplyDTO } from "./layers"

// CREATE ARTIST
export class CreateArtistReqDTO {
	profile: IProfile
	auth: IUserAuth
	authConfirm: IAuthConfirm

	constructor(profile: IProfile, auth: IUserAuth, authConfirm: IAuthConfirm) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
	}
}
export class CreateArtistReplyDTO extends ReplyDTO<INewArtistSucc> {}

// MODIFY ARTIST //
export class UpdateArtistReqDTO {
	id: ArtistID | undefined
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar: boolean | null // true = add, null = no changes, false = remove

	constructor(
		id: ArtistID | undefined,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatar: boolean | null // true = add, null = no changes, false = remove
	) {
		this.id = id
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.avatar = avatar
	}
}
export class UpdateArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID

export class GetArtistByIDReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

// ARTIST BY EMAIL
export class GetArtistByEmailReqDTO {
	email: UserEmail

	constructor(email: UserEmail) {
		this.email = email
	}
}
export class GetArtistByEmailReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

// GET ALL
export class GetAllArtistsReplyDTO extends ReplyDTO<IArtistsListSucc> {}

// ARTISTS BY GENRE
export type FindArtistsByGenreReqDTO = GenreType

export class FindArtistsByGenreReplyDTO extends ReplyDTO<IArtistsListSucc> {}
