import { AnnounceID, CreateAnnounceDTO, EditAnnounceDTO, ProfileID } from "Shared"
import { Announce, File } from "Domain"

export class NewAnnounceParamsAdapter {
	announce: Announce
	file?: File

	constructor(announce: Announce, file?: File) {
		this.announce = announce
		this.file = file
	}

	static fromDto(dto: CreateAnnounceDTO, owner: number, file?: File) {
		const { text, title } = dto
		const announce = new Announce(null, owner, title, text, null)

		return new NewAnnounceParamsAdapter(announce, file)
	}
}

export class EditAnnounceParamsAdapter {
	announce: Announce
	delImage?: boolean
	file?: File

	constructor(announce: Announce, delImage?: boolean, file?: File) {
		this.announce = announce
		this.file = file
		this.delImage = delImage
	}

	static fromDto(dto: EditAnnounceDTO, owner: number, file?: File) {
		const { text, title, id, delImage } = dto
		const announce = new Announce(id, owner, title, text, null)

		return new EditAnnounceParamsAdapter(announce, delImage, file)
	}
}

export class DeleteAnnounceParamsAdapter {
	id: AnnounceID
	ownerID?: ProfileID

	constructor(id: AnnounceID, ownerID?: ProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromDtoBackend(id: AnnounceID, ownerID: ProfileID) {
		return new DeleteAnnounceParamsAdapter(id, ownerID)
	}
}
