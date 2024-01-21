import { GenresArray } from "../../enums"
import { UserAuthID, UserEmail, UserPassword } from "../../values"

export interface IArtist {
	user_auth_id: UserAuthID | null
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatarUrl: string | null
}

export interface IProfile {
	name: string
	bio: string
	members: string[]
	genres: GenresArray
}

export interface IUserAuth {
	email: UserEmail
	password: UserPassword
}

export interface IAuthConfirm {
	confirmEmail: UserEmail
	confirmPass: UserPassword
}
