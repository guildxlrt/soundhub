import { FileType, IArtist, IUserAuth, UserEmail, UserPassword } from "../utils"

export class NewArtistAdapter {
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

export class ModifyArtistAdapter {
	profile: IArtist
	file?: FileType

	constructor(profile: IArtist, file?: FileType) {
		this.profile = profile
		this.file = file
	}
}

export class EmailAdapter {
	email: string

	constructor(email: string) {
		this.email = email
	}
}
