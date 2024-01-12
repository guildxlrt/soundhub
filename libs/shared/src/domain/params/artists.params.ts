import { Artist, UserAuth } from "../entities"
import { UserAuthId, UserEmail, UserPassword } from "../repositories"

export class NewArtistParams {
	profile: Artist
	auth: UserAuth
	authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
	hashedPass?: string
	file?: File

	constructor(
		profile: Artist,
		auth: UserAuth,
		authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword },
		hashedPass?: string,
		file?: File
	) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
		this.hashedPass = hashedPass
		this.file = file
	}
}

export class ModifyArtistParams {
	profile: Artist
	userAuth?: UserAuthId
	file?: File

	constructor(profile: Artist, userAuth?: UserAuthId, file?: File) {
		this.profile = profile
		this.userAuth = userAuth
		this.file = file
	}
}

export class EmailParams {
	email: string

	constructor(email: string) {
		this.email = email
	}
}
