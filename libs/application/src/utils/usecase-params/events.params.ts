import { ProfileID, EventID, CreateEventDTO, EditEventDTO } from "Shared"
import { Event, StreamFile } from "Domain"

export class NewEventUsecaseParams {
	event: Event
	file?: StreamFile

	constructor(event: Event, file?: StreamFile) {
		this.event = event
		this.file = file
	}

	static fromDto(dto: CreateEventDTO, owner: number, file?: StreamFile) {
		const { date, place, artists, title, text } = dto
		const event = new Event(null, owner as number, date, place, artists, title, text, null)

		return new NewEventUsecaseParams(event, file)
	}
}

export class EditEventUsecaseParams {
	event: Event
	delImage?: boolean
	file?: StreamFile

	constructor(event: Event, delImage?: boolean, file?: StreamFile) {
		this.event = event
		this.file = file
		this.delImage = delImage
	}

	static fromDto(dto: EditEventDTO, owner: number, file?: StreamFile) {
		const { id, date, place, artists, title, text, delImage } = dto
		const event = new Event(id, owner as number, date, place, artists, title, text, null)

		return new EditEventUsecaseParams(event, delImage, file)
	}
}

export class DeleteEventUsecaseParams {
	id: EventID
	ownerID?: ProfileID

	constructor(id: EventID, ownerID?: ProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromDtoBackend(id: EventID, ownerID: ProfileID) {
		return new DeleteEventUsecaseParams(id, ownerID)
	}
}

export class DateUsecaseParams {
	date: Date

	constructor(date: Date) {
		this.date = date
	}

	static fromDto(data: string) {
		return new DateUsecaseParams(new Date(data))
	}
}

export class PlaceUsecaseParams {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
