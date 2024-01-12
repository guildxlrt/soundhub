import { Event } from "../entities"
import { EventId, UserAuthId } from "../repositories"

export class NewEventParams {
	data: Event

	constructor(data: Event) {
		this.data = data
	}
}

export class ModifyEventParams {
	data: Event
	userAuth?: UserAuthId

	constructor(data: Event, userAuth?: UserAuthId) {
		this.data = data
		this.userAuth = userAuth
	}
}

export class DeleteEventParams {
	id: EventId
	userAuth?: UserAuthId

	constructor(id: EventId, userAuth?: UserAuthId) {
		this.id = id
		this.userAuth = userAuth
	}
}

export class DateParams {
	date: Date

	constructor(date: Date) {
		this.date = date
	}
}

export class PlaceParams {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
