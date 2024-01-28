import { ProfileID, EventID } from "Shared"
import { Event, File } from "Domain"

export class EventUsecaseParams {
	data: Event
	file?: File

	constructor(data: Event, file?: File) {
		this.data = data
		this.file = file
	}
}

export class DeleteEventUsecaseParams {
	id: EventID
	ownerID?: ProfileID

	constructor(id: EventID, ownerID?: ProfileID) {
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
