import { GetArtistByEmailReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, EmailUsecaseParams } from "../../assets"

export class GetArtistByEmailUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: EmailUsecaseParams): Promise<GetArtistByEmailReplyDTO> {
		try {
			const { email } = input
			return await this.services.artists.getByEmail(email)
		} catch (error) {
			return new GetArtistByEmailReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
