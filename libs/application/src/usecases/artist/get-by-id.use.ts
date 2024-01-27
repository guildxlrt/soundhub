import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"
import { GetArtistByIDReplyDTO, ErrorMsg } from "Shared"

export class GetArtistByIDUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<GetArtistByIDReplyDTO> {
		try {
			const id = input.id
			return await this.services.artists.getByID(id)
		} catch (error) {
			return new GetArtistByIDReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
