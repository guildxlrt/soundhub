import { DatabaseServices } from "Infra-backend"
import { GetArtistByEmailInputDTO, GetArtistByEmailReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { EmailParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

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
