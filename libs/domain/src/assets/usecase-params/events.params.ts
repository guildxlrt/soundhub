import { ArtistID, EventID, FileType, IEvent } from "Shared"

export class EventUsecaseParams {
	data: IEvent
	file?: FileType

	constructor(data: IEvent, file?: FileType) {
		this.data = data
		this.file = file
	}
}

export class DeleteEventUsecaseParams {
	id: EventID
	ownerID: ArtistID | null

	constructor(id: EventID, ownerID: ArtistID | null) {
		this.id = id
		this.ownerID = ownerID
	}
}

export class DateUsecaseParams {
	date: Date

	constructor(date: Date) {
		this.date = date
	}
}

export class PlaceUsecaseParams {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
