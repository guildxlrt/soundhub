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

	static fromBackend(dto: CreateEventDTO, authID: number, file?: StreamFile | unknown) {
		const { date, place, artists, title, text } = dto
		const event = new Event(null, authID as number, date, place, title, text, null)

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

	static fromBackend(dto: EditEventDTO, authID: number, file?: StreamFile | unknown) {
		const { id, date, place, title, text, delImage } = dto
		const event = new Event(id, authID as number, date, place, title, text, null)

		return new EditEventUsecaseParams(event, delImage, file as StreamFile)
	}
}

export class DeleteEventUsecaseParams {
	id: EventID
	authID?: ArtistProfileID

	constructor(id: EventID, authID?: ArtistProfileID) {
		this.id = id
		this.authID = authID
	}

	static fromBackend(id: EventID, authID: ArtistProfileID) {
		return new DeleteEventUsecaseParams(id, authID)
	}
}

export class PlaceUsecaseParams {
	place: string

	constructor(place: string) {
		this.place = place
	}
}

export class PlayAtEventUsecaseParams {
	event: number
	artists: number[]
	authID?: number

	constructor(event: number, artists: number[], authID?: number) {
		this.artists = artists
		this.event = event
		this.authID = authID
	}
}
