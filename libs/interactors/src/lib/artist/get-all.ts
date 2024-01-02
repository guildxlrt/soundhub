import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetAllArtistsInputDTO, GetAllArtistsReplyDTO } from "Dto"

export class GetAllArtistsUsecase extends BaseUsecase<GetAllArtistsInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		return await this.service.artist.getAll()
	}
}
