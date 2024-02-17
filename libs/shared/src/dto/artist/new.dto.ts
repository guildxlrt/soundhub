import { GenresArray, AnyObject } from "../../types"

class INewArtistProfile {
	readonly name: string
	readonly bio: string
	readonly members: string[]
	readonly genres: GenresArray
	readonly website: string | null
	readonly country: string | null

	constructor(
		name: string,
		bio: string,
		members: string[],
		genres: GenresArray,
		website: string | null,
		country: string | null
	) {
		this.name = name
		this.bio = bio
		this.members = members
		this.genres = genres
		this.website = website
		this.country = country
	}
}

class INewAuth {
	readonly password: string
	readonly email: string

	constructor(password: string, email: string) {
		this.password = password
		this.email = email
	}
}

export class IAuthConfirm {
	readonly confirmEmail: string
	readonly confirmPass: string

	constructor(confirmEmail: string, confirmPass: string) {
		this.confirmEmail = confirmEmail
		this.confirmPass = confirmPass
	}
}

export class NewArtistDTO {
	readonly profile: INewArtistProfile
	readonly auth: INewAuth
	readonly authConfirm: IAuthConfirm

	constructor(profile: INewArtistProfile, auth: INewAuth, authConfirm: IAuthConfirm) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
	}

	static createFromInput(profile: AnyObject, auth: AnyObject, authConfirm: AnyObject) {
		const newRecord = new INewArtistProfile(
			profile?.["name"],
			profile?.["bio"],
			profile?.["members"],
			profile?.["genres"],
			profile?.["website"],
			profile?.["country"]
		)
		const newAuth = new INewAuth(auth?.["password"], auth?.["email"])
		const newAuthConfirm = new IAuthConfirm(
			authConfirm?.["confirmEmail"],
			authConfirm?.["confirmPass"]
		)

		return new NewArtistDTO(newRecord, newAuth, newAuthConfirm)
	}
}
