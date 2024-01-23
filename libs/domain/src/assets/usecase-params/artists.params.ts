import { FileType, IArtist, IUserAuth, UserEmail, UserPassword } from "Shared"

export class NewArtistUsecaseParams {
	profile: IArtist
	auth: IUserAuth
	authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
	hashedPass?: string
	file?: FileType

	constructor(
		profile: IArtist,
		auth: IUserAuth,
		authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword },
		hashedPass?: string,
		file?: FileType
	) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = authConfirm
		this.hashedPass = hashedPass
		this.file = file
	}
}

export class UpdateArtistUsecaseParams {
	profile: IArtist
	file?: FileType

	constructor(profile: IArtist, file?: FileType) {
		this.profile = profile
		this.file = file
	}
}

export class EmailUsecaseParams {
	email: string

	constructor(email: string) {
		this.email = email
	}
}
