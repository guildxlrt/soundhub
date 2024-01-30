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
	readonly confirmEmail: string
	readonly confirmPass: string

	constructor(password: string, email: string, confirmEmail: string, confirmPass: string) {
		this.password = password
		this.email = email
		this.confirmEmail = confirmEmail
		this.confirmPass = confirmPass
	}
}

export class NewArtistDTO {
	readonly profile: NewArtistProfileDTO
	readonly auth: NewAuthDTO

	constructor(profile: NewArtistProfileDTO, auth: NewAuthDTO) {
		this.profile = profile
		this.auth = auth
	}

	static createFromInput(profile: AnyObject, auth: AnyObject) {
		const newRelease = new NewArtistProfileDTO(
			profile?.["name"],
			profile?.["bio"],
			profile?.["members"],
			profile?.["genres"]
		)
		const newAuth = new NewAuthDTO(
			auth?.["password"],
			auth?.["email"],
			auth?.["confirmEmail"],
			auth?.["confirmPass"]
		)

		return new NewArtistDTO(newRelease, newAuth)
	}
}
