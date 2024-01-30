import { AnnounceID, ProfileID } from "Shared"
import { Announce, File } from "Domain"

export class NewAnnounceUsecaseParams {
	announce: Announce
	file?: File

	constructor(announce: Announce, file?: File) {
		this.announce = announce
		this.file = file
	}
}

export class EditAnnounceUsecaseParams {
	announce: Announce
	delImage: boolean
	file?: File

	constructor(announce: Announce, delImage: boolean, file?: File) {
		this.announce = announce
		this.file = file
		this.delImage = delImage
	}
}

export class DeleteAnnounceUsecaseParams {
	id: AnnounceID
	ownerID?: ProfileID

	constructor(id: AnnounceID, ownerID?: ProfileID) {
		this.id = id
		this.ownerID = ownerID
	}
}
