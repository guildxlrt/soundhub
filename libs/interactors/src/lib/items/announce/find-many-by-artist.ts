import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindAnnouncesByArtistDTO } from "Dto"

export class FindAnnouncesByArtistUsecase extends BaseUsecase<FindAnnouncesByArtistDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindAnnouncesByArtistDTO): Promise<FindAnnouncesByArtistDTO> {
		return await this.service.announce.findManyByArtist(id)
	}
}
