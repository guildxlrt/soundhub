import { Artist, StreamFile, UserAuth } from "Domain"
import { NewArtistDTO, UpdateArtistDTO, UserEmail, UserPassword } from "Shared"

export class NewArtistUsecaseParams {
	profile: Artist
	auth: UserAuth
	file?: StreamFile
	authConfirm?: {
		confirmEmail: UserEmail
		confirmPass: UserPassword
	}

	constructor(
		profile: Artist,
		auth: UserAuth,
		file?: StreamFile,
		authConfirm?: {
			confirmEmail: UserEmail
			confirmPass: UserPassword
		}
	) {
		this.profile = profile
		this.auth = auth
		this.file = file
		this.authConfirm = authConfirm
	}

	static fromDto(dto: NewArtistDTO, file?: StreamFile) {
		const { profile, auth, authConfirm } = dto
		const { bio, genres, members, name } = profile
		const { password, email } = auth

		const artist = new Artist(null, null, name, bio, members, genres, null)
		const userAuth = new UserAuth(null, email, password)
		return new NewArtistUsecaseParams(artist, userAuth, file, authConfirm)
	}
}

export class UpdateArtistUsecaseParams {
	profile: Artist
	delAvatar?: boolean
	file?: StreamFile

	constructor(profile: Artist, delAvatar?: boolean, file?: StreamFile) {
		this.profile = profile
		this.delAvatar = delAvatar
		this.file = file
	}

	static fromDto(dto: UpdateArtistDTO, user: number, file?: StreamFile) {
		const { bio, genres, members, name, delAvatar } = dto

		const artist = new Artist(user, user, name, bio, members, genres, null)
		return new UpdateArtistUsecaseParams(artist, delAvatar, file)
	}
}

export class EmailUsecaseParams {
	email: UserEmail

	constructor(email: string) {
		this.email = email
	}
}
