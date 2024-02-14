import { Artist, StreamFile, UserAuth } from "Domain"
import { ArtistProfileID, NewArtistDTO, UpdateArtistDTO, UserEmail, UserPassword } from "Shared"

export class NewArtistUsecaseParams {
	profile: Artist
	auth: UserAuth
	authConfirm: {
		confirmEmail: UserEmail
		confirmPass: UserPassword
	}
	file?: StreamFile

	constructor(
		profile: Artist,
		auth: UserAuth,
		confirmEmail: UserEmail,
		confirmPass: UserPassword,
		file?: StreamFile
	) {
		this.profile = profile
		this.auth = auth
		this.authConfirm = {
			confirmEmail: confirmEmail,
			confirmPass: confirmPass,
		}
		this.file = file as StreamFile
	}

	static fromBackend(dto: NewArtistDTO, file?: StreamFile | unknown) {
		const { profile, auth, authConfirm } = dto
		const { bio, genres, members, name } = profile
		const { password, email } = auth
		const { confirmEmail, confirmPass } = authConfirm

		const artist = new Artist(null, null, name, bio, members, genres, null)
		const userAuth = new UserAuth(null, email, password)

		return new NewArtistUsecaseParams(
			artist,
			userAuth,
			confirmEmail,
			confirmPass,
			file as StreamFile
		)
	}
}

export class UpdateArtistUsecaseParams {
	profile: Artist
	delAvatar?: boolean
	file?: StreamFile

	constructor(profile: Artist, delAvatar?: boolean, file?: StreamFile | unknown) {
		this.profile = profile
		this.delAvatar = delAvatar
		this.file = file as StreamFile
	}

	static fromBackend(dto: UpdateArtistDTO, user: number, file?: StreamFile | unknown) {
		const { bio, genres, members, name, delAvatar } = dto

		const artist = new Artist(user, user, name, bio, members, genres, null)
		return new UpdateArtistUsecaseParams(artist, delAvatar, file)
	}
}

export class GetPublicStatusArtistUsecaseParams {
	id: ArtistProfileID

	constructor(id: ArtistProfileID) {
		this.id = id
	}

	static fromBackend(id: ArtistProfileID) {
		return new SetPublicStatusArtistUsecaseParams(id)
	}
}

export class SetPublicStatusArtistUsecaseParams {
	id?: ArtistProfileID

	constructor(id?: ArtistProfileID) {
		this.id = id
	}

	static fromBackend(id: ArtistProfileID) {
		return new SetPublicStatusArtistUsecaseParams(id)
	}
}
