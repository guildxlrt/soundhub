import { AnnounceID, ArtistID, FileType } from "Shared"
import { Announce } from "Domain"

export class AnnounceUsecaseParams {
	data: Announce
	file?: FileType

	constructor(data: Announce, file?: FileType) {
		this.data = data
		this.file = file
	}
}

export class DeleteAnnounceUsecaseParams {
	id: AnnounceID
	ownerID: ArtistID | null

	constructor(id: AnnounceID, ownerID: ArtistID | null) {
		this.id = id
		this.ownerID = ownerID
	}
}
