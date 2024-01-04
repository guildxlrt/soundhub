import { DatabaseServices } from "Infra-backend"
import { GetArtistByEmailReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { FetchByEmailParams } from "Domain"

export class GetArtistByEmailUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(email: FetchByEmailParams): Promise<GetArtistByEmailReplyDTO> {
		return await this.service.artist.getByEmail(email)
	}
}
