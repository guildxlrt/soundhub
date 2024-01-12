import { Announce } from "../entities"
import { AnnounceId, ArtistId, UserAuthId } from "../repositories"

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

export class DeleteAnnounceParams {
	id: AnnounceId
	userAuth?: UserAuthId

	constructor(id: AnnounceId, userAuth?: ArtistId) {
		this.id = id
		this.userAuth = userAuth
	}
}
