import { AnnounceID, ProfileID } from "Shared"
import { Announce, File } from "Domain"

export class AnnounceUsecaseParams {
	data: Announce
	file?: File

	constructor(data: Announce, file?: File) {
		this.data = data
		this.file = file
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
