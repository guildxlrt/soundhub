import { DatabaseServices } from "Infra-backend"
import { GetArtistByEmailInputDTO, GetArtistByEmailReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { EmailParams } from "Domain"

export class GetArtistByEmailUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetArtistByEmailInputDTO): Promise<GetArtistByEmailReplyDTO> {
		return await this.services.artists.getByEmail(new EmailParams(inputs.email))
	}
}
