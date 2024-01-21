import { GetArtistByEmailReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { EmailAdapter } from "Shared"

export class GetArtistByEmailUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: EmailAdapter): Promise<GetArtistByEmailReplyDTO> {
		try {
			const { email } = inputs
			return await this.services.artists.getByEmail(email)
		} catch (error) {
			return new GetArtistByEmailReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
