import { ProfileID, EventID, CreateEventDTO, EditEventDTO } from "Shared"
import { Event, File } from "Domain"

export class NewEventParamsAdapter {
	event: Event
	file?: File

	constructor(event: Event, file?: File) {
		this.event = event
		this.file = file
	}

	static fromDto(dto: CreateEventDTO, owner: number, file?: File) {
		const { date, place, artists, title, text } = dto
		const event = new Event(null, owner as number, date, place, artists, title, text, null)

		return new NewEventParamsAdapter(event, file)
	}
}

export class EditEventParamsAdapter {
	event: Event
	delImage?: boolean
	file?: File

	constructor(event: Event, delImage?: boolean, file?: File) {
		this.event = event
		this.file = file
		this.delImage = delImage
	}

	static fromDto(dto: EditEventDTO, owner: number, file?: File) {
		const { id, date, place, artists, title, text, delImage } = dto
		const event = new Event(id, owner as number, date, place, artists, title, text, null)

		return new EditEventParamsAdapter(event, delImage, file)
	}
}

export class DeleteEventParamsAdapter {
	id: EventID
	ownerID?: ProfileID

	constructor(id: EventID, ownerID?: ProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromDtoBackend(id: EventID, ownerID: ProfileID) {
		return new DeleteEventParamsAdapter(id, ownerID)
	}
}

export class DateParamsAdapter {
	date: Date

	constructor(date: Date) {
		this.date = date
	}

	static fromDto(data: string) {
		return new DateParamsAdapter(new Date(data))
	}
}

export class PlaceParamsAdapter {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
