import { GetArtistByEmailReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, EmailUsecaseParams } from "../../../assets"

export class GetArtistByEmailUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: EmailUsecaseParams): Promise<GetArtistByEmailReplyDTO> {
		try {
			const { email } = inputs
			return await this.services.artists.getByEmail(email)
		} catch (error) {
			return new GetArtistByEmailReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
