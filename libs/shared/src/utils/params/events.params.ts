import { EventId, IEvent, UserAuthId } from "../entities"

export class NewEventParams {
	data: IEvent

	constructor(data: IEvent) {
		this.data = data
	}
}

export class ModifyEventParams {
	data: IEvent
	userAuth?: UserAuthId

	constructor(data: IEvent, userAuth?: UserAuthId) {
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
