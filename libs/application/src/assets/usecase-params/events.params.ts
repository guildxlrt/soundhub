import { ProfileID, EventID } from "Shared"
import { Event, File } from "Domain"

export class NewEventUsecaseParams {
	event: Event
	file?: File

	constructor(event: Event, file?: File) {
		this.event = event
		this.file = file
	}
}

export class EditEventUsecaseParams {
	event: Event
	delImage: boolean
	file?: File

	constructor(event: Event, delImage: boolean, file?: File) {
		this.event = event
		this.file = file
		this.delImage = delImage
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
