import { DatabaseServices } from "Infra-backend"
import { GetArtistByEmailInputDTO, GetArtistByEmailReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"

export class GetArtistByEmailUsecase extends BaseUsecase<GetArtistByEmailInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(email: GetArtistByEmailInputDTO): Promise<GetArtistByEmailReplyDTO> {
		return await this.service.artist.getByEmail(email)
	}
}
