import { FileType, UserEmail, UserPassword } from "Shared"
import { Artist, UserAuth } from "Domain"

export class NewArtistUsecaseParams {
	profile: Artist
	auth: UserAuth
	authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
	file?: FileType

	constructor(
		profile: Artist,
		auth: UserAuth,
		authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword },
		file?: FileType
	) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
		this.file = file
	}
}

export class UpdateArtistUsecaseParams {
	data: { profile: Artist; avatarDel: boolean }
	file?: FileType

	constructor(data: { profile: Artist; avatarDel: boolean }, file?: FileType) {
		this.data = data
		this.file = file
	}
}

export class EmailUsecaseParams {
	email: string

	constructor(email: string) {
		this.email = email
	}
}
