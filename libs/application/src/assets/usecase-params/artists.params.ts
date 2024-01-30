import { UserEmail, UserPassword } from "Shared"
import { Artist, File, UserAuth } from "Domain"

export class NewArtistUsecaseParams {
	profile: Artist
	auth: UserAuth
	authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
	file?: File

	constructor(
		profile: Artist,
		auth: UserAuth,
		authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword },
		file?: File
	) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
		this.file = file
	}
}

export class UpdateArtistUsecaseParams {
	profile: Artist
	delAvatar: boolean
	file?: File

	constructor(profile: Artist, delAvatar: boolean, file?: File) {
		this.profile = profile
		this.delAvatar = delAvatar
		this.file = file
	}
}

export class EmailUsecaseParams {
	email: string

	constructor(email: string) {
		this.email = email
	}
}
