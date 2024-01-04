import { Artist, UserAuth } from "../../entities"

export class NewArtistParams {
	data: { profile: Artist; auths: UserAuth }
	file?: File

	constructor(data: { profile: Artist; auths: UserAuth }, file?: File) {
		this.data = data
		this.file = file
	}
}

export class ModifyArtistParams {
	data: Artist
	file?: File

	constructor(data: Artist, file?: File) {
		this.data = data
		this.file = file
	}
}
