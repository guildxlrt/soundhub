import { GetArtistByEmailReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { EmailParams } from "Shared"

export class GetArtistByEmailUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: EmailParams): Promise<GetArtistByEmailReplyDTO> {
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
