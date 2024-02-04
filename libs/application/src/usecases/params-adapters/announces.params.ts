import { AnnounceID, CreateAnnounceDTO, EditAnnounceDTO, ProfileID } from "Shared"
import { Announce, StreamFile } from "Domain"

export class NewAnnounceUsecaseParams {
	announce: Announce
	file?: StreamFile

	constructor(announce: Announce, file?: StreamFile) {
		this.announce = announce
		this.file = file
	}

	static fromDto(dto: CreateAnnounceDTO, owner: number, file?: StreamFile) {
		const { text, title } = dto
		const announce = new Announce(null, owner, title, text, null)

		return new NewAnnounceUsecaseParams(announce, file)
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

	static fromDto(dto: EditAnnounceDTO, owner: number, file?: StreamFile) {
		const { text, title, id, delImage } = dto
		const announce = new Announce(id, owner, title, text, null)

		return new EditAnnounceUsecaseParams(announce, delImage, file)
	}
}

export class DeleteAnnounceUsecaseParams {
	id: AnnounceID
	ownerID?: ProfileID

	constructor(id: AnnounceID, ownerID?: ProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromDtoBackend(id: AnnounceID, ownerID: ProfileID) {
		return new DeleteAnnounceUsecaseParams(id, ownerID)
	}
}
