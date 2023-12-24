import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetArtistByIdInputDTO, GetArtistByIdReplyDTO } from "Dto"

export class GetArtistByIdUsecase extends BaseUsecase<GetArtistByIdInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: GetArtistByIdInputDTO): Promise<GetArtistByIdReplyDTO> {
		return await this.service.artist.getById(id)
	}
}
