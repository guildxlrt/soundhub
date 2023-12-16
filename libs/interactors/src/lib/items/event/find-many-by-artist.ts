import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindEventsByArtistDTO } from "Dto"

export class FindEventsByArtistUsecase extends BaseUsecase<FindEventsByArtistDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: FindEventsByArtistDTO): Promise<FindEventsByArtistDTO> {
		return await this.service.event.findManyByArtist(id)
	}
}
