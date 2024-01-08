import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { GetArtistByEmailReqDTO, GetArtistByEmailReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { EmailParams } from "Shared"

export class GetArtistByEmailUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: GetArtistByEmailReqDTO): Promise<GetArtistByEmailReplyDTO> {
		try {
			return await this.services.artists.getByEmail(new EmailParams(inputs.email))
		} catch (error) {
			return new GetArtistByEmailReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
