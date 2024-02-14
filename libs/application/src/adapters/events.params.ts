import { ArtistProfileID, EventID, CreateEventDTO, EditEventDTO } from "Shared"
import { Event, StreamFile } from "Domain"

export class NewEventUsecaseParams {
	event: Event
	artists: ArtistProfileID[]
	file?: StreamFile

	constructor(event: Event, artists: ArtistProfileID[], file?: StreamFile) {
		this.event = event
		this.file = file
		this.artists = artists
	}

	static fromBackend(dto: CreateEventDTO, publisher: number, file?: StreamFile | unknown) {
		const { date, place, artists, title, text } = dto
		const event = new Event(null, publisher as number, date, place, title, text, null)

		return new NewEventUsecaseParams(event, artists, file as StreamFile)
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

	static fromBackend(dto: EditEventDTO, publisher: number, file?: StreamFile | unknown) {
		const { id, date, place, title, text, delImage } = dto
		const event = new Event(id, publisher as number, date, place, title, text, null)

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

	static fromBackend(id: EventID, ownerID: ArtistProfileID) {
		return new DeleteEventUsecaseParams(id, ownerID)
	}
}

export class PlaceUsecaseParams {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
