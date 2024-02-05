import { GenresArray, AnyObject } from "../../types"

class NewArtistProfileDTO {
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray

	constructor(name: string, bio: string, members: string[], genres: GenresArray) {
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
	}
}

class NewAuthDTO {
	readonly password: string
	readonly email: string

	constructor(password: string, email: string) {
		this.password = password
		this.email = email
	}
}

export class AuthConfirmDTO {
	readonly confirmEmail: string
	readonly confirmPass: string

	constructor(confirmEmail: string, confirmPass: string) {
		this.confirmEmail = confirmEmail
		this.confirmPass = confirmPass
	}
}

export class NewArtistDTO {
	readonly profile: NewArtistProfileDTO
	readonly auth: NewAuthDTO
	readonly authConfirm: AuthConfirmDTO

	constructor(profile: NewArtistProfileDTO, auth: NewAuthDTO, authConfirm: AuthConfirmDTO) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
	}

	static createFromInput(profile: AnyObject, auth: AnyObject, authConfirm: AnyObject) {
		const newRelease = new NewArtistProfileDTO(
			profile?.["name"],
			profile?.["bio"],
			profile?.["members"],
			profile?.["genres"]
		)
		const newAuth = new NewAuthDTO(auth?.["password"], auth?.["email"])
		const newAuthConfirm = new AuthConfirmDTO(
			authConfirm?.["confirmEmail"],
			authConfirm?.["confirmPass"]
		)

		return new NewArtistDTO(newRelease, newAuth, newAuthConfirm)
	}
}
