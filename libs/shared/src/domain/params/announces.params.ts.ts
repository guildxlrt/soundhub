import { Announce } from "../entities"

export class NewAnnounceParams {
	data: Announce

	constructor(data: Announce) {
		this.data = data
	}
}

export class ModifyAnnounceParams {
	data: Announce

	constructor(data: Announce) {
		this.data = data
	}
}
