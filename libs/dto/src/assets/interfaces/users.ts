import { GenresArray } from "Shared-utils"

// LOGIN
export interface ILogin {
	readonly email: string
	readonly password: string
}

// NEW AUTHS
export interface INewAuths {
	email: string
	password: string
	confirmEmail: string
	confirmPass: string
}

// EMAIL
export interface IChangeEmail {
	readonly actual: string
	readonly newEmail: string
	readonly confirm: string
}

// PASSWORD
export interface IChangePass {
	readonly actual: string
	readonly newPass: string
	readonly confirm: string
}

// ARTIST
export interface INewArtist {
	email: string
	password: string
	confirmEmail: string
	confirmPass: string
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar?: File
}

export interface IModifyArtist {
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar?: File | null
}
