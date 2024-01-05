import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetArtistByIdInputDTO, GetArtistByIdReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class GetArtistByIdUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetArtistByIdInputDTO): Promise<GetArtistByIdReplyDTO> {
		return await this.services.artists.getById(new IdParams(inputs.id))
	}
}
