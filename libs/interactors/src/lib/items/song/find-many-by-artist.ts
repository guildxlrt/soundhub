import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindSongsByArtistInputDTO, FindSongsByArtistReplyDTO } from "Dto"

export class FindSongsByArtistUsecase extends BaseUsecase<FindSongsByArtistInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindSongsByArtistInputDTO): Promise<FindSongsByArtistReplyDTO> {
		return await this.service.song.findManyByArtist(id)
	}
}
