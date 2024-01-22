import { AnnounceID, ArtistID, FileType, IAnnounce } from "../utils"

export class NewAnnounceAdapter {
	data: IAnnounce
	file?: FileType

	constructor(data: IAnnounce, file?: FileType) {
		this.data = data
		this.file = file
	}
}

export class ModifyAnnounceAdapter {
	data: IAnnounce
	file?: FileType

	constructor(data: IAnnounce, file?: FileType) {
		this.data = data
		this.file = file
	}
}

export class DeleteAnnounceAdapter {
	id: AnnounceID
	ownerID: ArtistID | null

	constructor(id: AnnounceID, ownerID: ArtistID | null) {
		this.id = id
		this.ownerID = ownerID
	}
}
