import { DatabaseServices } from "Infra-backend"
import { CreateArtistDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class CreateArtistUsecase extends BaseUsecase<CreateArtistDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(params: CreateArtistDTO): Promise<CreateArtistDTO> {
		return await this.service.artist.create(params)
	}
}
