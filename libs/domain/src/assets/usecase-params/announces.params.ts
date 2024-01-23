import { AnnounceID, ArtistID, FileType, IAnnounce } from "Shared"

export class AnnounceUsecaseParams {
	data: IAnnounce
	file?: FileType

	constructor(data: IAnnounce, file?: FileType) {
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
