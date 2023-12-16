import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetArtistByIdDTO } from "Dto"

export class GetArtistByIdUsecase extends BaseUsecase<GetArtistByIdDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: GetArtistByIdDTO): Promise<GetArtistByIdDTO> {
		return await this.service.artist.getById(id)
	}
}
