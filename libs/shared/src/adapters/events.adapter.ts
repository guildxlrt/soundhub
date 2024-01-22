import { ArtistID, EventID, FileType, IEvent } from "../utils"

export class NewEventAdapter {
	data: IEvent
	file?: FileType

	constructor(data: IEvent, file?: FileType) {
		this.data = data
		this.file = file
	}
}

export class ModifyEventAdapter {
	event: IEvent
	file?: FileType

	constructor(event: IEvent, file?: FileType) {
		this.event = event
		this.file = file
	}
}

export class DeleteEventAdapter {
	id: EventID
	ownerID: ArtistID | null

	constructor(id: EventID, ownerID: ArtistID | null) {
		this.id = id
		this.ownerID = ownerID
	}
}

export class DateAdapter {
	date: Date

	constructor(date: Date) {
		this.date = date
	}
}

export class PlaceAdapter {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
