import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetAllArtistsDTO } from "Dto"

export class GetAllArtistsUsecase extends BaseUsecase<GetAllArtistsDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetAllArtistsDTO): Promise<GetAllArtistsDTO> {
		return await this.service.artist.getAll(inputs)
	}
}
