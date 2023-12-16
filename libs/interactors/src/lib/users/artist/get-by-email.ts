import { DatabaseServices } from "Infra-backend"
import { GetArtistByEmailDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class GetArtistByEmailUsecase extends BaseUsecase<GetArtistByEmailDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(email: GetArtistByEmailDTO): Promise<GetArtistByEmailDTO> {
		return await this.service.artist.getByEmail(email)
	}
}
