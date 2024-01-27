import { ArtistID, EventID, FileType } from "Shared"
import { Event } from "Domain"

export class EventUsecaseParams {
	data: Event
	file?: FileType

	constructor(data: Event, file?: FileType) {
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
