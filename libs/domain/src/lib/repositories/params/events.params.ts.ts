import { Event } from "../../entities"

export class NewEventParams {
	data: Event

	constructor(data: Event) {
		this.data = data
	}
}
