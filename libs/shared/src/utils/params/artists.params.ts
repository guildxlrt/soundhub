import { IArtist, IUserAuth, UserAuthId, UserEmail, UserPassword } from "../../utils"

export class NewArtistParams {
	profile: IArtist
	auth: IUserAuth

	authConfirm: { confirmEmail: UserEmail; confirmPass: UserPassword }
	hashedPass?: string
	file?: File

	constructor(
		profile: IArtist,
		auth: IUserAuth,
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
	profile: IArtist
	userAuth?: number
	file?: File

	constructor(profile: IArtist, userAuth?: UserAuthId, file?: File) {
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
