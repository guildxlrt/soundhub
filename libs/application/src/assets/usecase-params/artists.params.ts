import { Artist, File, UserAuth } from "Domain"
import { NewArtistDTO, UpdateArtistDTO, UserEmail } from "Shared"

export class NewArtistParamsAdapter {
	profile: Artist
	auth: UserAuth
	file?: File

	constructor(profile: Artist, auth: UserAuth, file?: File) {
		this.profile = profile
		this.auth = auth
		this.file = file
	}

	static fromDto(dto: NewArtistDTO, file?: File) {
		const { profile, auth } = dto
		const { bio, genres, members, name } = profile
		const { password, email } = auth

		const artist = new Artist(null, null, name, bio, members, genres, null)
		const userAuth = new UserAuth(null, email, password)
		return new NewArtistParamsAdapter(artist, userAuth, file)
	}
}

export class UpdateArtistParamsAdapter {
	profile: Artist
	delAvatar?: boolean
	file?: File

	constructor(profile: Artist, delAvatar?: boolean, file?: File) {
		this.profile = profile
		this.delAvatar = delAvatar
		this.file = file
	}

	static fromDto(dto: UpdateArtistDTO, user: number, file?: File) {
		const { bio, genres, members, name, delAvatar } = dto

		const artist = new Artist(user, user, name, bio, members, genres, null)
		return new UpdateArtistParamsAdapter(artist, delAvatar, file)
	}
}

export class EmailParamsAdapter {
	email: UserEmail

	constructor(email: string) {
		this.email = email
	}
}
