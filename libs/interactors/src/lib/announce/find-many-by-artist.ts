import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindAnnouncesByArtistInputDTO, FindAnnouncesByArtistReplyDTO } from "Dto"

export class FindAnnouncesByArtistUsecase extends BaseUsecase<FindAnnouncesByArtistInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindAnnouncesByArtistInputDTO): Promise<FindAnnouncesByArtistReplyDTO> {
		return await this.service.announce.findManyByArtist(id)
	}
}
