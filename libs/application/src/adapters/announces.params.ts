import { AnnounceID, CreateAnnounceDTO, EditAnnounceDTO, ArtistProfileID } from "Shared"
import { Announce, StreamFile } from "Domain"

export class NewAnnounceUsecaseParams {
	announce: Announce
	file?: StreamFile

	constructor(announce: Announce, file?: StreamFile) {
		this.announce = announce
		this.file = file
	}

	static fromBackend(dto: CreateAnnounceDTO, authID: number, file?: StreamFile | unknown) {
		const { text, title } = dto
		const announce = new Announce(null, authID, title, text, null)

		return new NewAnnounceUsecaseParams(announce, file as StreamFile)
	}
}

export class EditAnnounceUsecaseParams {
	announce: Announce
	delImage?: boolean
	file?: StreamFile

	constructor(announce: Announce, delImage?: boolean, file?: StreamFile) {
		this.announce = announce
		this.file = file
		this.delImage = delImage
	}

	static fromBackend(dto: EditAnnounceDTO, authID: number, file?: StreamFile | unknown) {
		const { text, title, id, delImage } = dto
		const announce = new Announce(id, authID, title, text, null)

		return new EditAnnounceUsecaseParams(announce, delImage, file as StreamFile)
	}
}

export class DeleteAnnounceUsecaseParams {
	id: AnnounceID
	authID?: ArtistProfileID

	constructor(id: AnnounceID, authID?: ArtistProfileID) {
		this.id = id
		this.authID = authID
	}

	static fromBackend(id: AnnounceID, authID: ArtistProfileID) {
		return new DeleteAnnounceUsecaseParams(id, authID)
	}
}

export class AnnouncesSearchAnnouncesUsecase {}
