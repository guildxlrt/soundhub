import { ArtistProfileID, EventID, CreateEventDTO, EditEventDTO } from "Shared"
import { Event, StreamFile } from "Domain"

export class NewEventUsecaseParams {
	event: Event
	file?: StreamFile

	constructor(event: Event, file?: StreamFile) {
		this.event = event
		this.file = file
	}

	static fromDto(dto: CreateEventDTO, owner: number, file?: StreamFile | unknown) {
		const { date, place, artists, title, text } = dto
		const event = new Event(null, owner as number, date, place, artists, title, text, null)

		return new NewEventUsecaseParams(event, file as StreamFile)
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

	static fromDto(dto: EditEventDTO, owner: number, file?: StreamFile | unknown) {
		const { id, date, place, artists, title, text, delImage } = dto
		const event = new Event(id, owner as number, date, place, artists, title, text, null)

		return new EditEventUsecaseParams(event, delImage, file as StreamFile)
	}
}

export class DeleteEventUsecaseParams {
	id: EventID
	ownerID?: ArtistProfileID

	constructor(id: EventID, ownerID?: ArtistProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromDtoBackend(id: EventID, ownerID: ArtistProfileID) {
		return new DeleteEventUsecaseParams(id, ownerID)
	}
}

export class PlaceUsecaseParams {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
