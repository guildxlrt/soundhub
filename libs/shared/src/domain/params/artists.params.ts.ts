import { Artist, UserAuth } from "../entities"

export class NewArtistParams {
	profile: Artist
	auths: UserAuth
	hashedPass?: string
	file?: File

	constructor(profile: Artist, auths: UserAuth, hashedPass?: string, file?: File) {
		this.profile = profile
		this.auths = auths
		this.hashedPass = hashedPass
		this.file = file
	}
}

export class ModifyArtistParams {
	data: Artist
	file?: File

	constructor(data: Artist, file?: File) {
		this.data = data
		this.file = file
	}
}
