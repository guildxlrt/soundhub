import { ArtistID, EventID, IEvent } from "../utils"

export class NewEventAdapter {
	data: IEvent
	file?: File

	constructor(data: IEvent, file?: File) {
		this.data = data
		this.file = file
	}
}

export class ModifyEventAdapter {
	event: IEvent
	file?: File

	constructor(event: IEvent, file?: File) {
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
