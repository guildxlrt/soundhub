import {
	ArtistID,
	GenreType,
	IArtistInfoSucc,
	IArtistsListSucc,
	GenresArray,
	UserEmail,
	UserPassword,
	ILoginSucc,
} from "../assets"
import { ReplyDTO } from "./layers"

// CREATE ARTIST
export class CreateArtistReqDTO {
	readonly profile: {
		readonly name: string
		readonly bio: string
		readonly members: string[]
		readonly genres: GenresArray
	}
	readonly auth: { readonly email: UserEmail; readonly password: UserPassword }
	readonly authConfirm: { readonly confirmEmail: UserEmail; readonly confirmPass: UserPassword }

	constructor(
		profile: { name: string; bio: string; members: string[]; genres: GenresArray },
		auth: { email: UserEmail; password: UserPassword },
		authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
	) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
	}
}
export class CreateArtistReplyDTO extends ReplyDTO<ILoginSucc> {}

// MODIFY ARTIST //
export class UpdateArtistReqDTO {
	readonly id: ArtistID
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly avatarPath: string
	readonly avatarDel: boolean

	constructor(
		id: ArtistID,
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		avatarPath: string,
		avatarDel: boolean
	) {
		this.id = id
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.avatarPath = avatarPath
		this.avatarDel = avatarDel
	}
}
export class UpdateArtistReplyDTO extends ReplyDTO<boolean> {}

// ARTIST BY ID

export class GetArtistByIDReplyDTO extends ReplyDTO<IArtistInfoSucc> {}

// ARTIST BY EMAIL
export class GetArtistByEmailReqDTO {
	readonly email: UserEmail

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
