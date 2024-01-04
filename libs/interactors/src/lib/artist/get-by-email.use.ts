import { DatabaseServices } from "Infra-backend"
import { GetArtistByEmailReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { EmailParams } from "Domain"

export class GetArtistByEmailUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(email: EmailParams): Promise<GetArtistByEmailReplyDTO> {
		return await this.services.artists.getByEmail(email)
	}
}
