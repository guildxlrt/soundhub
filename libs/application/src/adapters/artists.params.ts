import { Artist, StreamFile, UserAuth } from "Domain"
import {
	ArtistProfileID,
	ItemStatusType,
	NewArtistDTO,
	UpdateArtistDTO,
	UserAuthID,
	UserEmail,
	UserPassword,
} from "Shared"

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
		const { website, country, bio, genres, members, name } = profile
		const { password, email } = auth
		const { confirmEmail, confirmPass } = authConfirm

		const artist = new Artist(
			null,
			null,
			null,
			name,
			bio,
			members,
			genres,
			website,
			country,
			null
		)
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
	deleteLogo?: boolean
	file?: StreamFile

	constructor(profile: Artist, deleteLogo?: boolean, file?: StreamFile | unknown) {
		this.profile = profile
		this.deleteLogo = deleteLogo
		this.file = file as StreamFile
	}

	static fromBackend(dto: UpdateArtistDTO, user: number, file?: StreamFile | unknown) {
		const { website, country, id, bio, genres, members, name, deleteLogo } = dto

		const artist = new Artist(
			id,
			user,
			null,
			name,
			bio,
			members,
			genres,
			website,
			country,
			null
		)
		return new UpdateArtistUsecaseParams(artist, deleteLogo, file)
	}
}

export class GetPublicStatusArtistUsecaseParams {
	id: ArtistProfileID

	constructor(id: ArtistProfileID) {
		this.id = id
	}

	static fromBackend(id: ArtistProfileID) {
		return new GetPublicStatusArtistUsecaseParams(id)
	}
}

export class SetStatusArtistUsecaseParams {
	artistProfileID: ArtistProfileID
	status: ItemStatusType
	authID?: UserAuthID

	constructor(artistProfileID: ArtistProfileID, status: ItemStatusType, authID?: UserAuthID) {
		this.artistProfileID = artistProfileID
		this.status = status
		this.authID = authID
	}

	static fromBackend(
		artistProfileID: ArtistProfileID,
		status: ItemStatusType,
		authID?: UserAuthID
	) {
		return new SetStatusArtistUsecaseParams(artistProfileID, status, authID)
	}
}
