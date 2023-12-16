import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindSongsByArtistDTO } from "Dto"

export class FindSongsByArtistUsecase extends BaseUsecase<FindSongsByArtistDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindSongsByArtistDTO): Promise<FindSongsByArtistDTO> {
		return await this.service.song.findManyByArtist(id)
	}
}
