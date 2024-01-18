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

interface IProfile {
	name: string
	bio: string
	members: string[]
	genres: GenresArray
}
interface IAuth {
	email: UserEmail
	password: UserPassword
}
interface IAuthConfirm {
	confirmEmail: UserEmail
	confirmPass: UserPassword
}

// CREATE ARTIST
export class CreateArtistReqDTO {
	profile: IProfile
	auth: IAuth
	authConfirm: IAuthConfirm

	constructor(profile: IProfile, auth: IAuth, authConfirm: IAuthConfirm) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
	}
}
export class CreateArtistReplyDTO extends ReplyDTO<INewArtistSucc> {}

// MODIFY ARTIST //
export class ModifyArtistReqDTO {
	id: ArtistId | undefined
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar: boolean | null // true = add, null = no changes, false = remove

	constructor(
		id: ArtistId | undefined,
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
export class ModifyArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID

export class GetArtistByIdReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

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
