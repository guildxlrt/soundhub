import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindEventsByArtistInputDTO, FindEventsByArtistReplyDTO } from "Dto"

export class FindEventsByArtistUsecase extends BaseUsecase<FindEventsByArtistInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindEventsByArtistInputDTO): Promise<FindEventsByArtistReplyDTO> {
		return await this.service.event.findManyByArtist(id)
	}
}
