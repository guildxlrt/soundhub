import { DatabaseServices } from "Infra-backend"
import { GetArtistByEmailInputDTO, GetArtistByEmailReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { EmailParams } from "Shared"

export class GetArtistByEmailUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetArtistByEmailInputDTO): Promise<GetArtistByEmailReplyDTO> {
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
