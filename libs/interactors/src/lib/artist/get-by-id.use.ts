import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetArtistByIdReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class GetArtistByIdUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<GetArtistByIdReplyDTO> {
		return await this.services.artists.getById(inputs)
	}
}