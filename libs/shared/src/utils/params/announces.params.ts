import { AnnounceId, ArtistId, IAnnounce, UserAuthId } from "../entities"

export class NewAnnounceParams {
	data: IAnnounce

	constructor(data: IAnnounce) {
		this.data = data
	}
}

export class ModifyAnnounceParams {
	data: IAnnounce

	constructor(data: IAnnounce) {
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
