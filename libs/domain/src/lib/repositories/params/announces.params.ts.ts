import { Announce } from "../../entities"

export class NewAnnounceParams {
	data: Announce

	constructor(data: Announce) {
		this.data = data
	}
}
